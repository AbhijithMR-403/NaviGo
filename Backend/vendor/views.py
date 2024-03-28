from rest_framework.response import Response
from rest_framework import status
from .serializers import BusAddSerializer, BusDetailSerializer, BusCreateRouteSerializer, RouteWayPointCreateSerializer, RouteWayPointListSerializer, BusListRouteSerializer, RouteWayPointDetailSerializer
from rest_framework import generics
from bus.models import BusStop
from .models import BusDetail, Route, wayPoints
from account.models import VendorDetails
from admin_management.serializers import VendorDetailsSerializer
from rest_framework.permissions import IsAuthenticated
from .utils import divide_time

# Create your views here.


# Create Bus Detail View
class BusCreateView(generics.CreateAPIView):
    queryset = BusDetail.objects.all()
    serializer_class = BusAddSerializer
    permission_classes = [IsAuthenticated]


# List all the Buses available
# ? This needs to change, as a vendor need not view all the buses but only their own
class BusListView(generics.ListAPIView):
    queryset = BusDetail.objects.all()
    serializer_class = BusDetailSerializer
    permission_classes = [IsAuthenticated]
    # lookup_field = 'user_id'

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        print("User ID:", user_id)
        queryset = BusDetail.objects.filter(user_id=user_id)
        print("Filtered queryset:", queryset)
        return queryset


class vendorDetailsView(generics.RetrieveUpdateAPIView):
    queryset = VendorDetails.objects.all()
    serializer_class = VendorDetailsSerializer
    lookup_field = 'user'


# Create bus Route View
class BusRouteCreateView(generics.CreateAPIView):
    queryset = Route.objects.all()
    serializer_class = BusCreateRouteSerializer

# List WayPoints


class WayPointListView(generics.ListCreateAPIView):
    queryset = wayPoints.objects.all()
    serializer_class = RouteWayPointListSerializer


# Create waypoints
    # ? I might remove this
class WayPointCreateView(generics.CreateAPIView):
    queryset = wayPoints.objects.all()
    serializer_class = RouteWayPointCreateSerializer


# To List all Route and It's waypoint, bus details
class RouteWayPointView(generics.ListAPIView):
    queryset = Route.objects.all()
    serializer_class = RouteWayPointDetailSerializer

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        print('this is the thing', user_id)
        queryset = Route.objects.select_related(
            'origin').filter(bus_detail__user_id=user_id)
        print("Filtered queryset:", queryset)
        return queryset


class WayPointBulkCreateView(generics.CreateAPIView):
    queryset = wayPoints.objects.all()
    serializer_class = RouteWayPointCreateSerializer

    def create(self, request, *args, **kwargs):
        # ?
        if isinstance(request.data['stop'], list):
            stops = request.data.pop('stop')
            route = request.data.get('route')
            try:
                route_obj = Route.objects.get(pk=route)
            except:
                return Response({"error": "Route does not exist"}, status=status.HTTP_400_BAD_REQUEST)
            starting_time = route_obj.starting_time
            ending_time = route_obj.ending_time
            # listTiming = divide_time(starting_time, ending_time, len(stops))
            # print(listTiming)

            wayPointTimes = divide_time(starting_time, ending_time, len(stops))
            print(wayPointTimes)
            models = []
            # for stop, PTime in zip(stops, wayPointTimes):
            for stop, PTime in zip(stops, wayPointTimes):
                request.data['stop'] = stop
                request.data['reaching_time'] = PTime
                print(BusStop.objects.get(pk=int(stop['id'])))
                try:
                    data = {
                        'stop': stop['id'],
                        'reaching_time': PTime,
                        'route': route
                    }
                except:
                    return Response({'error': 'Bus Stop does not exist'}, status=status.HTTP_400_BAD_REQUEST)
                serializer = RouteWayPointCreateSerializer(data=data)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                models.append(serializer.data)
            return Response(models)
        # Save ticket as usual
        print('Its an error here')
        serializer = RouteWayPointListSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
