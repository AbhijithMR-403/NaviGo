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
            print('yoooooooo')
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
        refresh["is_admin"] = str(user.is_superuser)

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
        print(request.POST['email'])
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            try:
                random_num = random.randint(1000, 9999)
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
    def post(self, request):
        print('yoo you reach here man', request.data['email'])
        random_num = random.randint(1000, 9999)
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
            return Response({"Message": "Unknown error"}, status=status.HTTP_406_NOT_ACCEPTABLE)


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
    def put(self, request):
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


# class VendorRegister(APIView):
    
#     def post(self, request):
#         # request.data['is_vendor'] = True

#         serializer = UserRegisterSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()

#         print(serializer.data)
#         try:
#             user = Account.objects.get(
#                 email=serializer.data['email'])
#         except:
#             print(serializer.errors)
#             return Response({'error': 'Email Does Not Exist'},
#                             status=status.HTTP_401_UNAUTHORIZED)
#         request.data['user'] = user.id
#         print(request.data)

#         vendor_serializer = RegVendorSerializer(data=request.data)

#         if vendor_serializer.is_valid():
#             print(vendor_serializer)
#             vendor_serializer.save()
#         else:
#             print(vendor_serializer.errors)
#             return Response(vendor_serializer.errors,
#                             status=status.HTTP_406_NOT_ACCEPTABLE)
#         print(vendor_serializer)
#         content = {'message': 'User Registered Successfully'}
#         return Response(content, status=status.HTTP_201_CREATED,)


class vendorDetailsApi(generics.RetrieveAPIView):
    queryset = VendorDetails.objects.all()
    serializer_class = VendorDetailSerializer
    lookup_field = 'user'



class VendorRegister(generics.ListCreateAPIView):

    queryset = VendorDetails.objects.all()
    serializer_class = RegVendorSerializer
    