from rest_framework import serializers
from account.models import Account


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'
