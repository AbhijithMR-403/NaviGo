from django.shortcuts import render
from account.models import Account
from vendor.models import Route, BusDetail
from rest_framework import generics
from .serializers import UserDetailSerializer, UserBusListSerializer
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


class FilterBusView(generics.ListAPIView):
    queryset = Route.objects.all()
    serializer_class = RouteWayPointDetailSerializer

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        print('this is the thing', user_id)
        queryset = Route.objects.select_related('origin').filter(bus_detail__user_id=user_id)
        print("Filtered queryset:", queryset)
        return queryset
