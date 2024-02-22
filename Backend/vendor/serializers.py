from rest_framework import serializers
from .models import BusDetail, Route, wayPoints


class BusAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusDetail
        exclude = ['available_seats']


class BusDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusDetail
        fields = '__all__'


class BusRouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = '__all__'


class RouteWayPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = wayPoints
        exclude = ["order"]
