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


class BusConnectionListSerializer(serializers.ModelSerializer):
    bus_stop_1 = BusStopSerializer()
    bus_stop_2 = BusStopSerializer()

    class Meta:
        model = ConnectedRoute
        # fields = ['bus_stop_1', 'bus_stop_2']
        fields = '__all__'

