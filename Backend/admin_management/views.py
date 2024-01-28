from django.shortcuts import render
from rest_framework import generics
from account.models import Account, VendorDetails
from rest_framework.permissions import IsAuthenticated
from admin_management.serializers import UserListSerializer, VendorDetailsSerializer
# Create your views here.


class UserList(generics.ListCreateAPIView):
    queryset = Account.objects.all()
    serializer_class = UserListSerializer
    # permission_classes = [IsAdminUser]


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Account.objects.all()
    serializer_class = UserListSerializer
    lookup_field = 'id'


class VendorApproval(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = VendorDetails.objects.select_related('user').all()
    serializer_class = VendorDetailsSerializer

