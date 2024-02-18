from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from account.models import Account, VendorDetails
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import AuthenticationFailed, ParseError
from django.contrib.auth import authenticate
from .serializers import UserRegisterSerializer, UserSerializer, RegVendorSerializer, VendorDetailSerializer
import random
from rest_framework import generics
from django.core.mail import send_mail
from django.core.files.base import ContentFile
from urllib.request import urlopen
from rest_framework.parsers import MultiPartParser, FormParser
from decouple import config
from google.oauth2 import id_token
from google.auth.transport import requests


class UserLogin(APIView):

    def post(self, request):

        try:
            email = request.data['email']
            password = request.data['password']
            print(email, password)

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

        content = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'isAdmin': user.is_superuser,
            "is_vendor": user.is_vendor,
            "is_vendor_active": vendor_active
        }
        print(content)
        return Response(content, status=status.HTTP_200_OK)


class HomeView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        content = {
            'message': 'Welcome to the JWT Authentication page using React Js and Django!'}
        return Response(content)


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            print('log out')
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            print("401 error mannnn")
            # return Response(status=status.HTTP_400_BAD_REQUEST)
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class RegisterView(APIView):
    def post(self, request):
        # request.data['is_active'] = True
        print(request.POST['email'], request.data['email'])
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = Account.objects.get(email=request.data['email'])
            try:
                random_num = random.randint(1000, 9999)
                user.OTP = random_num
                user.save()
                send_mail(
                    "OTP AUTHENTICATING NaviGO",
                    f"{random_num} -OTP",
                    "luttapimalayali@gmail.com",
                    [request.POST['email']],
                    fail_silently=False,
                )
            except:
                return Response({"Message": "Unknown error"})
        else:
            print('am here man', serializer['is_active'].value)
            is_active = False
            content = {
                'message': 'Registration failed',
                'errors': serializer.errors,
                'is_active': is_active
            }
            return Response(content, status=status.HTTP_409_CONFLICT)

        content = {"Message": "OTP send",
                   "OTP": str(random_num), "username": serializer.data['email']
                   }
        return Response(content, status=status.HTTP_201_CREATED)


class Send_OTP(APIView):
    def patch(self, request):
        print('yoo you reach here man', request.data['email'])
        random_num = random.randint(1000, 9999)
        user = Account.objects.filter(email=request.data['email'])
        if user.exists():
            return Response({'error': 'This mail already exist'}, status=status.HTTP_409_CONFLICT)
        user[0].otp = random_num
        user[0].save()
        try:
            send_mail(
                "OTP AUTHENTICATING NaviGO",
                f"{random_num} -OTP",
                "luttapimalayali@gmail.com",
                [request.data['email']],
                fail_silently=False,
            )
            context = {
                "Message": "OTP send",
                "OTP": str(random_num)
            }
            return Response(context, status=status.HTTP_200_OK)
        except:
            return Response({"error": "Unknown error"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    def get(self, request):
        try:
            user = Account.objects.get(email=request.data['email'])
        except:
            return Response({'error': 'Email not found.'}, status=status.HTTP_404_NOT_FOUND)


class GoogleRegisterView(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if Account.objects.filter(email=request.data['email']).exists():
            return Response({'Message': 'email already exist'}, status=status.HTTP_409_CONFLICT)

        print(serializer)
        if serializer.is_valid():
            serializer.save()
            send_mail(
                "NaviGO",
                "Welcome \n Start you destination plan",
                "luttapimalayali@gmail.com",
                [request.data['email']],
                fail_silently=False,
            )
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

        content = {'Message': 'User Registered Successfully',
                   "username": serializer.data['username']
                   }
        return Response(content, status=status.HTTP_201_CREATED,)


class OtpVerify(APIView):
    def patch(self, request):
        print(request.data)
        print(request.data['uname'])
        uname = request.data['uname']
        try:
            user = Account.objects.get(email=uname)
        except Account.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        # user = Account.objects.get(username=uname)
        user.is_active = True
        user.save()

        content = {
            'message': 'User is activated',
        }
        return Response(content, status=status.HTTP_200_OK)


class UserDetails(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = Account.objects.get(id=request.user.id)

        data = UserSerializer(user).data

        content = data
        return Response(content)


class VendorRegister(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        print(request.data['email'])
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        else:
            print('am here man', serializer['is_active'].value)
            is_active = False
            content = {
                'message': 'Registration failed',
                'error': serializer.errors,
                'is_active': is_active
            }
            return Response(content, status=status.HTTP_409_CONFLICT)

        content = {"Message": "OTP send",
                   "username": serializer.data['email']
                   }
        return Response(content, status=status.HTTP_201_CREATED)


class UserGoogleAuth(APIView):

    def post(self, request):
        accountExist = True
        try:
            google_request = requests.Request()
            id_info = id_token.verify_oauth2_token(
                request.data['client_id'], google_request,  audience=None)
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
        refresh["is_admin"] = str(False)

        content = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'isAdmin': False,
            "isVendor": False,
            'accountExist': accountExist,
        }
        print(content)

        return Response(content, status=status.HTTP_200_OK)
