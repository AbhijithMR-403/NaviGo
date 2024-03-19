from rest_framework import serializers
from account.models import Account
from vendor.models import BusDetail
from .models import TicketOrder, Payment
from vendor.serializers import RouteWayPointDetailSerializer


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

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'


class TicketDetailSerializer(serializers.ModelSerializer):
    user_id = UserDetailSerializer()
    route_id = RouteWayPointDetailSerializer()

    class Meta:
        model = TicketOrder
        fields = '__all__'
