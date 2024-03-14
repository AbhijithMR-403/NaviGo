from rest_framework.views import APIView
from rest_framework import status
from .serializers import BusAddSerializer, BusDetailSerializer, BusCreateRouteSerializer, RouteWayPointCreateSerializer, RouteWayPointListSerializer, BusListRouteSerializer, RouteWayPointDetailSerializer
from rest_framework import generics
from .models import BusDetail, Route, wayPoints
from account.models import VendorDetails
from admin_management.serializers import VendorDetailsSerializer
from rest_framework.permissions import IsAuthenticated
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


# List the route Bus is going to travel
class BusRouteListView(generics.ListAPIView):
    queryset = Route.objects.all()
    serializer_class = BusListRouteSerializer


# Create waypoints
class WayPointListView(generics.ListCreateAPIView):
    queryset = wayPoints.objects.all()
    serializer_class = RouteWayPointListSerializer


class WayPointCreateView(generics.CreateAPIView):
    queryset = wayPoints.objects.all()
    serializer_class = RouteWayPointCreateSerializer


class RouteWayPointView(generics.ListAPIView):
    queryset = Route.objects.all()
    serializer_class = RouteWayPointDetailSerializer
    # permission_classes = (IsOwnerOrReadOnly, )
