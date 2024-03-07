from rest_framework import serializers
from .models import BusDetail, Route, wayPoints
from bus.serializers import BusStopSerializer


class BusAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusDetail
        exclude = ['available_seats']

    def validate_identify_img(self, value):
        if value is None or len(value) == 0:
            raise serializers.ValidationError(
                'upload a Identification image')
        return value

    def validate_bus_name(self, value):
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


class BusCreateRouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        # fields = '__all__'
        exclude = ['wayPointCount',]

    # def validate_destination(self, value):

    def validate(self, data):
        print(data, '\n\n\n\n\n')
        destination = data['destination']
        origin = data['origin']
        data['wayPointCount'] = 3
        if destination == origin:
            raise serializers.ValidationError(
                'Destination and Origin must be different')
        if Route.objects.filter(destination=destination, origin=origin).exists():
            raise serializers.ValidationError('This route already exists')
        # if 'wayPointCount' in data:
        #     waypoints = data['wayPointCount']
        #     if waypoints and len(waypoints) < 1 or len(waypoints) > 8:
        #         raise serializers.ValidationError(
        #             'Way points should contain between 1 to 8 items beyong that cost me money')
        return data


class RouteWayPointSerializer(serializers.ModelSerializer):
    stop = BusStopSerializer()

    class Meta:
        model = wayPoints
        # fields = '__all__'
        exclude = ["order"]


class BusListRouteSerializer(serializers.ModelSerializer):
    waypoints = RouteWayPointSerializer(many=True, read_only=True)

    class Meta:
        model = Route
        fields = '__all__'
