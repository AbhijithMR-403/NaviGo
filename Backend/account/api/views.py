from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from account.models import Account, VendorDetails
from account.tasks import send_notification_mail
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import AuthenticationFailed, ParseError
from django.contrib.auth import authenticate
from .serializers import UserRegisterSerializer, UserSerializer, VendorDetailSerializer
import random
from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from decouple import config
from datetime import datetime, timedelta, timezone
from google.oauth2 import id_token
from google.auth.transport import requests


class UserLogin(APIView):

    def post(self, request):
        try:
            email = request.data['email']
            password = request.data['password']
        except KeyError:
            raise ParseError('All Fields Are Required')
        if not Account.objects.filter(email=email).exists():
            return Response({'error': 'Email Does Not Exist'},
                            status=status.HTTP_404_NOT_FOUND)
        if not Account.objects.filter(email=email, is_active=True).exists():
            user = Account.objects.get(email=email)
            return Response({'error': 'Your mail is not validated', 'user': user.id}, status=status.HTTP_401_UNAUTHORIZED)
        user = authenticate(username=email, password=password)
        if user is None:
            return Response({'error': 'Invalid password'},
                            status=status.HTTP_401_UNAUTHORIZED)
        vendor = VendorDetails.objects.filter(user=user)
        refresh = RefreshToken.for_user(user)
        vendor_active = False
        if vendor.exists():
            refresh["vendor_active"] = vendor[0].approve
            vendor_active = vendor[0].approve
        else:
            refresh["vendor_active"] = False
        refresh["is_vendor"] = user.is_vendor
        refresh["name"] = str(user.username)
        refresh["is_admin"] = user.is_superuser
        vendor_detail = VendorDetails.objects.filter(user=user).exists()
        content = {
            'vendor_details': vendor_detail,
            'user_id': user.id,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'isAdmin': user.is_superuser,
            "is_vendor": user.is_vendor,
            "is_vendor_active": vendor_active
        }
        return Response(content, status=status.HTTP_200_OK)


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class RegisterView(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        email = request.data['email']
        if Account.objects.filter(email=email, is_active=False, is_email_verified=False, is_vendor=False).exists():
            Account.objects.get(email=email).delete()

        if serializer.is_valid():
            serializer.save()
        else:
            email = serializer.data['email']
            if Account.objects.filter(email=email, is_email_verified=True).exists():
                context = {
                    'user_id': Account.objects.get(email=email).id,
                    'error': "Email already exists"
                }
                return Response(context, status=status.HTTP_409_CONFLICT)

            if Account.objects.filter(email=email, is_active=False, is_email_verified=False).exists():
                context = {
                    'user_id': Account.objects.get(email=email).id,
                    'error': "Email already exists, But not verified"
                }
                return Response(context, status=status.HTTP_401_UNAUTHORIZED)
            is_active = False
            content = {
                'message': 'Registration failed',
                'error': serializer.errors,
                'is_active': is_active
            }
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        content = {"Message": "User Registered",
                   'user_id': serializer.data['id'],
                   "username": serializer.data['email']}
        return Response(content, status=status.HTTP_201_CREATED)


class Send_OTP(APIView):
    def patch(self, request):
        random_num = random.randint(1000, 9999)
        try:
            userID = int(request.data['userID'])
        except:
            return Response({'error': 'userID cannot be null'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = None
            if userID:
                user = Account.objects.get(id=userID)
        except:
            return Response({'error': 'Such an email does not exist'}, status=status.HTTP_404_NOT_FOUND)
        if user.is_active:
            return Response({'error': 'This user is already active'}, status=status.HTTP_208_ALREADY_REPORTED)
        current_time = datetime.now(timezone.utc)
        otp_expiry_time = user.OTP_expire
        try:
            if user.OTP_expire is not None:
                if current_time < otp_expiry_time:
                    time_remaining = otp_expiry_time - current_time
                    error_message = f'OTP was sent just before (wait for {time_remaining.seconds} seconds)'
                    return Response({'error': error_message}, status=status.HTTP_429_TOO_MANY_REQUESTS)
                else:
                    user.OTP = random_num
                    user.save()
            else:
                user.OTP = random_num
                user.OTP_expire = current_time
                user.save()
        except:
            return Response({"error": "Unknown error"}, status=status.HTTP_406_NOT_ACCEPTABLE)

        try:
            send_notification_mail(user.email, f"{random_num} -OTP")
        except:
            return Response({'error': 'This OTP is not sent'}, status=status.HTTP_408_REQUEST_TIMEOUT)

        context = {
            "Message": "OTP send"
        }
        return Response(context, status=status.HTTP_200_OK)


class OtpVerify(APIView):
    def patch(self, request):
        UserID = int(request.data['UserID'])
        try:
            user = Account.objects.get(id=UserID)
        except Account.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        if user.is_active:
            return Response({'message': 'user is already active'}, status=status.HTTP_200_OK)
        user.is_active = True
        user.is_email_verified = True
        user.is_active = (int(request.data['OTP']) == user.OTP)
        if int(request.data['OTP']) != user.OTP:
            return Response({'error': 'Not a valid OTP'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        user.save()
        content = {
            'message': 'User is activated',
        }
        return Response(content, status=status.HTTP_201_CREATED)


class UserDetails(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = Account.objects.get(id=request.user.id)

        data = UserSerializer(user).data

        content = data
        return Response(content)


class UserGoogleAuth(APIView):

    def post(self, request):

        accountExist = True
        try:
            google_request = requests.Request()
            id_info = id_token.verify_oauth2_token(
                request.data['client_id'], google_request,  config('GOOGLE_AUTH_API'), clock_skew_in_seconds=10)
            email = id_info['email']

        except KeyError:
            raise ParseError('Check credential')

        if not Account.objects.filter(email=email).exists():
            accountExist = False
            username = id_info['given_name'] + id_info['jti'][-4:]
            name = id_info['name']
            user = Account.objects.create(email=email, username=username,
                                          name=name, is_active=True, is_email_verified=True)
            user.save()

        user = Account.objects.get(email=email)

        if VendorDetails.objects.filter(user=user).exists():
            return Response({"error": "This account has already been registered as a seller."},)

        refresh = RefreshToken.for_user(user)
        refresh["is_vendor"] = False
        refresh["name"] = str(user.username)
        refresh["is_admin"] = False

        content = {
            'refresh': str(refresh),
            'user_id': user.id,
            'access': str(refresh.access_token),
            'isAdmin': False,
            "isVendor": False,
            'accountExist': accountExist,
        }

        return Response(content, status=status.HTTP_200_OK)


class AddVendorDetails(generics.CreateAPIView):
    queryset = VendorDetails.objects.all()
    serializer_class = VendorDetailSerializer


class UpdatePassword(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        password = request.data['password']
        new_password = request.data['new_password']
        user = request.data['user']
        try:
            user = Account.objects.get(id=user)
        except:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        if user.check_password(password):
            user.set_password(new_password)
            user.save()
            return Response('password updated', status=status.HTTP_202_ACCEPTED)
        return Response({'error': 'That\'s not the password'}, status=status.HTTP_403_FORBIDDEN)
