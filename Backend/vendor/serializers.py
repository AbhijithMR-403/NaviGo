from rest_framework import serializers
from .models import BusDetail, Route, wayPoints
from bus.serializers import BusStopSerializer
from bus.models import BusStop


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
        fields = '__all__'

    def validate(self, data):
        destination = data['destination']
        origin = data['origin']
        start = data['starting_time']
        end = data['ending_time']
        if destination == origin:
            raise serializers.ValidationError(
                'Destination and Origin must be different')
        if Route.objects.filter(bus_detail=data['bus_detail'], starting_time__lt=end, ending_time__gt=start).exists():
            raise serializers.ValidationError(
                {'error': 'A route with the same time frame already exists for this bus'})

        if 'wayPointCount' in data:
            waypoints = data['wayPointCount']
            if waypoints and len(waypoints) < 1 or len(waypoints) > 8:
                raise serializers.ValidationError(
                    {'error': 'Way points should contain between 1 to 8 items beyong that cost me money'})
        return data


class RouteWayPointListSerializer(serializers.ModelSerializer):
    stop = BusStopSerializer()

    class Meta:
        model = wayPoints
        fields = '__all__'

    def create(self, validated_data):
        stop_data = validated_data.pop('stop')
        print(stop_data)
        stop_instance = BusStop.objects.get(id=stop_data.id)
        waypoint = wayPoints.objects.create(
            stop=stop_instance, **validated_data)
        return waypoint


class RouteWayPointCreateSerializer(serializers.ModelSerializer):
    # starting_time = serializers.TimeField()
    # ending_time = serializers.TimeField()

    class Meta:
        model = wayPoints
        # fields = '__all__'
        exclude = ["order"]
        
    def create(self, validated_data):
        stop_data = validated_data.pop('stop')
        print(stop_data)
        stop_instance = BusStop.objects.get(id=stop_data.id)
        waypoint = wayPoints.objects.create(
            stop=stop_instance, **validated_data)
        return waypoint


class BusListRouteSerializer(serializers.ModelSerializer):
    waypoints = RouteWayPointListSerializer(many=True, read_only=True)

    class Meta:
        model = Route
        fields = '__all__'


# ? Currently used only in RouteWayPointDetailSerializer
# serializer to get the raw Waypoint object
# class WayPointViewSerializer(serializers.ModelSerializer):
#     stop = BusStopSerializer()
#     class Meta:
#         model = wayPoints
#         fields = '__all__'


# return Route details along with of bus, waypoints, origin, destination, etc.
class RouteWayPointDetailSerializer(serializers.ModelSerializer):
    waypoints = RouteWayPointListSerializer(many=True)
    bus_detail = BusDetailSerializer()
    origin = BusStopSerializer()
    destination = BusStopSerializer()

    class Meta:
        model = Route
        fields = '__all__'
