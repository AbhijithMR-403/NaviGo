from django.shortcuts import render
from .serializers import BusAddSerializer, BusDetailSerializer, BusRouteSerializer, RouteWayPointSerializer
from rest_framework import generics
from .models import BusDetail, Route, wayPoints
from account.models import VendorDetails
from admin_management.serializers import VendorDetailsSerializer
from rest_framework.permissions import IsAuthenticated
# Create your views here.


class BusCreateView(generics.CreateAPIView):
    queryset = BusDetail.objects.all()
    serializer_class = BusAddSerializer
    # permission_classes = [IsAuthenticated]


class BusListView(generics.ListAPIView):
    queryset = BusDetail.objects.all()
    serializer_class = BusDetailSerializer
    # permission_classes = [IsAuthenticated]


class vendorDetailsView(generics.RetrieveUpdateAPIView):
    queryset = VendorDetails.objects.all()
    serializer_class = VendorDetailsSerializer
    lookup_field = 'user'


class BusRouteView(generics.ListCreateAPIView):
    queryset = Route.objects.all()
    serializer_class = BusRouteSerializer


class RouteWayPointView(generics.ListCreateAPIView):
    queryset = wayPoints.objects.all()
    serializer_class = RouteWayPointSerializer
