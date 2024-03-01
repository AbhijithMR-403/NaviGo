from rest_framework import serializers
from .models import BusDetail, Route, wayPoints


class BusAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusDetail
        exclude = ['available_seats']

    def validate_identify_img(self, value):
        print(value, '\n\n\nthis is for identifucaton image')
        if value is None or len(value) == 0:
            raise serializers.ValidationError(
                'upload a Identification image')
        return value

    def validate_bus_name(self, value):
        print('akdjlak')
        if value == "":
            raise serializers.ValidationError("Bus name cannot be null")
        return value

    def validate(self, attrs):
        print(attrs)
        if 'bus_number' not in attrs:
            raise serializers.ValidationError("Bus number cannot be null")
        if 'bus_name' not in attrs:
            raise serializers.ValidationError("Bus number cannot be null")
        if 'seating_capacity' not in attrs:
            raise serializers.ValidationError("seat capacity cannot be null")
        if 'identify_img' not in attrs:
            raise serializers.ValidationError(
                'Identification image field can not be blank')
        return attrs


class BusDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusDetail
        fields = '__all__'


class BusRouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        # fields = '__all__'
        exclude = ['wayPointCount',]


class RouteWayPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = wayPoints
        fields = '__all__'
        # exclude = ["order"]
