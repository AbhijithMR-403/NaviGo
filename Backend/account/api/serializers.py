# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer,TokenRefreshSerializer

from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from account.models import Account, VendorDetails
# from rest_framework_simplejwt.tokens import RefreshToken, Token,AccessToken


# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)
#         token['first_name'] = user.name
#         return token


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'username', 'email', 'password', 'is_active']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        validated_data['password'] = make_password(
            validated_data.get('password'))
        validated_data['is_active'] = False
        return super(UserRegisterSerializer, self).create(validated_data)


# class UserDetails(serializers.Serializer):
#     is_vendor = serializers.BooleanField()

#     class Meta:
#         model = Account
#         fields = ['id', 'username', 'email', 'password', 'profile_img']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        exclude = ('password',)


# class LoginVendorSerialzer(serializers.ModelSerializer):
#     is_vendor = serializers.BooleanField()
#     user = serializers.PrimaryKeyRelatedField(queryset=Account.objects.all())
#     company_name = serializers.CharField(max_length=50)
#     approve = serializers.BooleanField()

#     class Meta:
#         model = Account
#         fields = ['id', 'first_name', 'phone_number', 'email', 'password']
#         extra_kwargs = {
#             'password': {'write_only': True}
#         }

#     def create(self, validated_data):
#         password = validated_data.pop('password', None)
#         instance = self.Meta.model(**validated_data)
#         if password is not None:
#             instance.set_password(password)
#             instance.save()
#             return instance
#         else:
#             raise serializers.ValidationError(
#                 {"password": "password is not valid"})

class LoginVendorSerializer(serializers.ModelSerializer):

    class Meta:
        model = VendorDetails
        fields = ['id', 'is_vendor', 'user', 'company_name', 'approve']

    def create(self, validated_data):
        print('inside create fun \n\n', validated_data.get('user'))
        vendor_details = VendorDetails.objects.create(**validated_data)
        return vendor_details
