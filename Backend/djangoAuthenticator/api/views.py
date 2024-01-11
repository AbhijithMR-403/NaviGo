from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from djangoAuthenticator.models import Account
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import AuthenticationFailed, ParseError
from django.contrib.auth import authenticate
from .serializers import UserRegisterSerializer


class UserLogin(APIView):

    def post(self, request):

        try:
            email = request.data['email']
            password = request.data['password']

        except KeyError:
            raise ParseError('All Fields Are Required')

        if not Account.objects.filter(email=email).exists():
            raise AuthenticationFailed('Invalid Email Address')

        if not Account.objects.filter(email=email, is_active=True).exists():
            raise AuthenticationFailed(
                'You are blocked by admin ! Please contact admin')
        user = authenticate(username=email, password=password)
        if user is None:
            raise AuthenticationFailed('Invalid Password')

        refresh = RefreshToken.for_user(user)
        refresh["name"] = str(user.username)
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
            return Response(status=status.HTTP_400_BAD_REQUEST)


class RegisterView(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE,)
        # serializer.is_valid(raise_exception=True)
        # serializer.save()

        content = {'Message': 'User Registered Successfully'}
        return Response(content, status=status.HTTP_201_CREATED,)
