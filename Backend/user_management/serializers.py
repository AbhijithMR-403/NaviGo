from rest_framework import serializers
from account.models import Account
from vendor.models import BusDetail
from .models import TicketOrder, Payment


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'

class UserBusListSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusDetail
        fields = '__all__'

class TicketOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketOrder
        fields = '__all__'
