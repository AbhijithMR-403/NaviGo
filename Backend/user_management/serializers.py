from rest_framework import serializers
from account.models import Account
from vendor.models import BusDetail
from .models import TicketOrder, Payment
from vendor.serializers import RouteWayPointDetailSerializer, RouteWayPointListSerializer
from vendor.serializers import BusDetailSerializer, BusStopSerializer
from vendor.models import Route


# UpdateUsers, 
class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['name', 'phone_number', 'profile_img', 'username', 'email']


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
    start_stop = BusStopSerializer()
    end_stop = BusStopSerializer()

    class Meta:
        model = TicketOrder
        fields = '__all__'


class UserAvailableRouteView(serializers.ModelSerializer):
    # waypoints = RouteWayPointListSerializer(many=True)
    bus_detail = BusDetailSerializer()
    origin = BusStopSerializer()
    destination = BusStopSerializer()

    class Meta:
        model = Route
        fields = '__all__'

    def to_representation(self, instance):
        list_stops = [{'stop': BusStopSerializer(
            instance.origin).data, 'reaching_time': instance.starting_time, 'order': 1}]
        representation = super().to_representation(instance)
        waypoints = instance.waypoints.all()
        for waypoint in waypoints:
            bus_serializer = BusStopSerializer(
                RouteWayPointListSerializer(waypoint).data['stop']).data
            time = RouteWayPointListSerializer(waypoint).data['reaching_time']
            order = RouteWayPointListSerializer(waypoint).data['order']
            list_stops.append(
                {'stop': bus_serializer, "reaching_time": time, "order": order+1})
        list_stops.append({'stop': BusStopSerializer(
            instance.destination).data, 'reaching_time': instance.ending_time, 'order': len(waypoints)+2})
        representation['list_stops'] = list_stops

        return representation

    def to_internal_value(self, data):
        resource_data = data['waypoints']

        return super().to_internal_value(resource_data)


# To get the available Dates
class RouteSerializer(serializers.ModelSerializer):
    # bus_detail = BusDetailSerializer()
    # origin = BusStopSerializer()
    # destination = BusStopSerializer()

    class Meta:
        model = Route
        fields = []

    def to_representation(self, instance):
        # The first stop is been added to list_stop
        list_stops = [{'stop': BusStopSerializer(
            instance.origin).data['id'], 'reaching_time': instance.starting_time, 'order': 1}]
        representation = super().to_representation(instance)
        waypoints = instance.waypoints.all()

        # Waypoint that needs to be appended to list_stop
        for waypoint in waypoints:
            bus_serializer = BusStopSerializer(waypoint.stop).data['id']
            time = waypoint.reaching_time
            order = waypoint.order
            list_stops.append(
                {'stop': bus_serializer, 'reaching_time': time, 'order': order + 1})

        # The last stop to be appended
        list_stops.append({'stop': BusStopSerializer(instance.destination).data['id'],
                          'reaching_time': instance.ending_time, 'order': len(waypoints) + 2})
        representation['list_stops'] = list_stops

        return representation
