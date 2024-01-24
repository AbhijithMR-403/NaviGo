from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics
from .models import BusStop
from .serializers import BusStopSerializer
from rest_framework.response import Response
from rest_framework import status
# Create your views here.


class BusStopLocation(generics.ListCreateAPIView):
    queryset = BusStop.objects.all()
    serializer_class = BusStopSerializer
    # def post(self, request):
    #     serializer = BusStopSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response({'message': 'success'}, status=status.HTTP_201_CREATED)
    #     else:
    #         return Response({'message': 'success'}, status=status.HTTP_406_NOT_ACCEPTABLE)