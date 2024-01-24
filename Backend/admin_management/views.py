from django.shortcuts import render
from rest_framework import generics
from account.models import Account
from admin_management.serializers import UserListSerializer
# Create your views here.


class UserList(generics.ListCreateAPIView):
    queryset = Account.objects.all()
    serializer_class = UserListSerializer
    # permission_classes = [IsAdminUser]


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Account.objects.all()
    serializer_class = UserListSerializer
    lookup_field = 'id'
