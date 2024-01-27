from rest_framework import serializers
from account.models import Account, VendorDetails


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'


class VendorDetailsSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer()

    class Meta:
        model = VendorDetails
        fields = '__all__'
