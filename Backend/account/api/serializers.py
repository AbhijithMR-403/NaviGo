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
        fields = ['id', 'username', 'email', 'name',
                  'password', 'is_active', 'is_vendor', 'phone_number', 'profile_img']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, attrs):
        if 'password' not in attrs or not attrs['password'].strip():
            raise serializers.ValidationError({"error": "Password is required"})
        return super().validate(attrs)

    def create(self, validated_data):
        validated_data['password'] = make_password(
            validated_data.get('password'))
        return super(UserRegisterSerializer, self).create(validated_data)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        exclude = ('password',)


class VendorDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendorDetails
        fields = '__all__'
        # fields = ['id', 'user', 'company_name', 'approve']


class RegVendorSerializer(serializers.ModelSerializer):

    class Meta:
        model = VendorDetails
        # fields = ['id', 'user', 'company_name', 'approve']
        fields = '__all__'

    def create(self, validated_data):
        print('inside create fun \n\n', validated_data.get('user'))
        vendor_details = VendorDetails.objects.create(**validated_data)
        return vendor_details
