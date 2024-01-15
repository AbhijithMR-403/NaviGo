# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer,TokenRefreshSerializer

from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from djangoAuthenticator.models import Account
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
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        validated_data['password'] = make_password(
            validated_data.get('password'))
        return super(UserRegisterSerializer, self).create(validated_data)
