from rest_framework.views import APIView
from rest_framework import status
from .serializers import BusAddSerializer, BusDetailSerializer, BusCreateRouteSerializer, RouteWayPointSerializer, BusListRouteSerializer
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


class vendorDetailsView(generics.RetrieveUpdateAPIView):
    queryset = VendorDetails.objects.all()
    serializer_class = VendorDetailsSerializer
    lookup_field = 'user'


# Create bus Route View
class BusRouteCreateView(generics.ListCreateAPIView):
    queryset = Route.objects.all()
    serializer_class = BusCreateRouteSerializer


# List the route Bus is going to travel
class BusRouteListView(generics.ListCreateAPIView):
    queryset = Route.objects.all()
    serializer_class = BusListRouteSerializer


class RouteWayPointView(generics.ListCreateAPIView):
    queryset = wayPoints.objects.all()
    serializer_class = RouteWayPointSerializer
