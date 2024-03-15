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
                            status=status.HTTP_401_UNAUTHORIZED)

        if not Account.objects.filter(email=email, is_active=True).exists():
            return Response({'error': 'Incorrect Email'}, status=status.HTTP_403_FORBIDDEN)

        user = authenticate(username=email, password=password)
        if user is None:
            raise AuthenticationFailed('Invalid Password')
        vendor = VendorDetails.objects.filter(user=user)
        refresh = RefreshToken.for_user(user)
        vendor_active = False
        if vendor.exists():
            vendor_active = vendor[0].approve
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
        print(content)
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
        if serializer.is_valid():
            serializer.save()
            user = Account.objects.get(email=request.data['email'])
            random_num = None
            if not user.is_vendor:
                try:
                    random_num = random.randint(1000, 9999)
                    user.OTP = random_num
                    user.save()
                    send_notification_mail.delay(
                        request.POST['email'], f"{random_num} -OTP")
                except:
                    return Response({"Message": "Unknown error"})
        else:
            is_active = False
            content = {
                'message': 'Registration failed',
                'errors': serializer.errors,
                'is_active': is_active
            }
            return Response(content, status=status.HTTP_409_CONFLICT)

        content = {"Message": "OTP send",
                   'user_id': serializer.data['id'],
                   "username": serializer.data['email']}
        return Response(content, status=status.HTTP_201_CREATED)


class Send_OTP(APIView):
    def patch(self, request):
        random_num = random.randint(1000, 9999)
        try:
            user = None
            if request.data['userID']:
                user = Account.objects.get(id=request.data['userID'])
        except:
            return Response({'error': 'Such an email does not exist'}, status=status.HTTP_404_NOT_FOUND)
        print('this use is active or not \n\n', user.is_active)
        if user.is_active:
            return Response({'error': 'This user is already active'}, status=status.HTTP_208_ALREADY_REPORTED)
        user.OTP = random_num
        user.save()

        print('OTP :-\n\n\n\n', random_num)
        try:
            send_notification_mail.delay(
                request.POST['email'], f"{random_num} -OTP")
            context = {
                "Message": "OTP send",
                "OTP": str(random_num)
            }
            return Response(context, status=status.HTTP_200_OK)
        except:
            return Response({"error": "Unknown error"}, status=status.HTTP_406_NOT_ACCEPTABLE)


class OtpVerify(APIView):
    def patch(self, request):
        UserID = request.data['UserID']
        try:
            user = Account.objects.get(id=UserID)
        except Account.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        if user.is_active:
            return Response({'message': 'user is already active'}, status=status.HTTP_200_OK)
        user.is_active = True
        user.is_active = (int(request.data['OTP']) == user.OTP)
        if int(request.data['OTP']) != user.OTP:
            return Response({'error': 'Not a valid OTP'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        user.save()
        print('check is it active or not', user.is_active)
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
                request.data['client_id'], google_request,  config('GOOGLE_AUTH_API'))
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
        print(content)

        return Response(content, status=status.HTTP_200_OK)


class AddVendorDetails(generics.CreateAPIView):
    queryset = VendorDetails.objects.all()
    serializer_class = VendorDetailSerializer
