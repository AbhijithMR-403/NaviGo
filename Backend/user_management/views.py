from django.shortcuts import render
from account.models import Account
from vendor.models import Route, BusDetail
from rest_framework import generics
from .models import TicketOrder
from .serializers import UserDetailSerializer, UserBusListSerializer, TicketOrderSerializer
from vendor.serializers import RouteWayPointDetailSerializer

# Create your views here.

class UserDetail(generics.RetrieveAPIView):
    queryset = Account.objects.all()
    serializer_class = UserDetailSerializer
    lookup_field = 'id'



class UserUpdateDetailView(generics.UpdateAPIView):
    queryset = Account.objects.all()
    serializer_class = UserDetailSerializer
    lookup_field = 'id'


# List all the Bus Route Details
class BusRouteListView(generics.ListAPIView):
    queryset = Route.objects.all()
    serializer_class = RouteWayPointDetailSerializer


# ? this is not used yet
# For filtering bus
class FilterBusView(generics.ListAPIView):
    queryset = Route.objects.all()
    serializer_class = RouteWayPointDetailSerializer


class TicketOrderCreateView(generics.CreateAPIView):
    serializer_class = TicketOrderSerializer
    queryset = TicketOrder.objects.all()
