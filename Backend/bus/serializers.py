from rest_framework import serializers
from .models import BusStop, ConnectedRoute


class BusStopSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusStop
        fields = '__all__'


class BusConnectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConnectedRoute
        fields = '__all__'
