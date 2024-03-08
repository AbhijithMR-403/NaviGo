from django.shortcuts import render
from account.models import Account
from rest_framework import generics
from .serializers import UserDetailSerializer

# Create your views here.

class UserDetail(generics.RetrieveAPIView):
    queryset = Account.objects.all()
    serializer_class = UserDetailSerializer
    lookup_field = 'id'



class UserUpdateDetailView(generics.UpdateAPIView):
    queryset = Account.objects.all()
    serializer_class = UserDetailSerializer
    lookup_field = 'id'
