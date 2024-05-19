from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics
from django.db.models import Sum
from rest_framework.response import Response
from user_management.models import TicketOrder
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


class vendorDetailsUpdateApi(generics.RetrieveUpdateAPIView):
    queryset = VendorDetails.objects.all()
    serializer_class = VendorDetailsSerializer
    lookup_field = 'user'


class DashBoardDetails(APIView):
    def get(self, request):
        user_count = Account.objects.all().count()
        order_count = TicketOrder.objects.filter(status='Delivered').count()
        total_amt = TicketOrder.objects.filter(status='Delivered').aggregate(total=Sum('total'))
        print(total_amt)
        context = {
            'user_count': user_count,
            'order_count': order_count,
            'total_amt': total_amt['total']
        }
        return Response(context)