from rest_framework import serializers
from account.models import Account, VendorDetails


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'
