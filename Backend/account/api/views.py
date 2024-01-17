from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from account.models import Account
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import AuthenticationFailed, ParseError
from django.contrib.auth import authenticate
from .serializers import UserRegisterSerializer, UserSerializer, LoginVendorSerializer
import random
from django.core.mail import send_mail


class UserLogin(APIView):

    def post(self, request):
        print(request.data)

        try:
            email = request.data['email']
            password = request.data['password']
            print(email, password)

        except KeyError:
            raise ParseError('All Fields Are Required')

        if not Account.objects.filter(email=email).exists():
            # raise AuthenticationFailed('Invalid Email Address')
            return Response({'error': 'Email Does Not Exist'}, status=status.HTTP_401_UNAUTHORIZED)

        if not Account.objects.filter(email=email, is_active=True).exists():
            raise AuthenticationFailed(
                'You are blocked by admin ! Please contact admin')

        user = authenticate(username=email, password=password)
        if user is None:
            raise AuthenticationFailed('Invalid Password')

        refresh = RefreshToken.for_user(user)
        print(request.data)

        refresh["name"] = str(user.username)
        refresh["is_admin"] = str(user.is_superuser)
        refresh["is_vendor"] = str(False)

        content = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'isAdmin': user.is_superuser,
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
        serializer = UserRegisterSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            random_num = random.randint(1000, 9999)
            send_mail(
                "OTP AUTHENTICATING NaviGO",
                f"{random_num} -OTP",
                "luttapimalayali@gmail.com",
                [request.data['email']],
                fail_silently=False,
            )
        else:
            return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE,)
        # serializer.is_valid(raise_exception=True)
        # serializer.save()

        content = {'Message': 'User Registered Successfully',
                   "otp": random_num,
                   "username": serializer.data['username']
                   }
        return Response(content, status=status.HTTP_201_CREATED,)

    # def get(self, request, name):
    #     user = Account.objects.get(username=name)
    #     random_num = random.randint(1000, 9999)
    #     send_mail(
    #             "OTP AUTHENTICATING NaviGO",
    #             f"{random_num} -OTP",
    #             "luttapimalayali@gmail.com",
    #             [user.email],
    #             fail_silently=False,
    #         )


class OtpVerify(APIView):
    def put(self, request):
        uname = request.data['uname']
        print("hereeeeeeee\n\n", uname)
        try:
            user = Account.objects.get(username=uname)
        except Account.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        user = Account.objects.get(username=uname)
        user.is_active = True
        user.save()
        print(user)

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

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()

        print(serializer.data)
        user = Account.objects.get(email=serializer.data['email'])
        print(user)
        request.data['user'] = user.id
        print(request.data)

        vendor_serializer = LoginVendorSerializer(data=request.data)

        print('\n\n\n')
        print(vendor_serializer)
        if vendor_serializer.is_valid():
            print(vendor_serializer)
            vendor_serializer.save()
        else:
            return Response(vendor_serializer.errors,
                            status=status.HTTP_406_NOT_ACCEPTABLE)
        print(vendor_serializer)
        content = {'Message': 'User Registered Successfully'}
        return Response(content, status=status.HTTP_201_CREATED,)
