from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics
from .models import BusStop, ConnectedRoute
from .serializers import BusStopSerializer, BusConnectionSerializer
from rest_framework.response import Response
from rest_framework import status
import googlemaps
from datetime import datetime
from decouple import config

# Create your views here.


class BusStopDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = BusStop.objects.all()
    serializer_class = BusStopSerializer


class BusStopLocation(generics.ListCreateAPIView):
    queryset = BusStop.objects.all()
    serializer_class = BusStopSerializer


class ConnectBus(generics.ListCreateAPIView):
    queryset = ConnectedRoute.objects.all()
    serializer_class = BusConnectionSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # For example, check if the bus stops are valid or not
            bus_stop_1 = serializer.validated_data.get('bus_stop_1')
            bus_stop_2 = serializer.validated_data.get('bus_stop_2')
            print(bus_stop_1.lat, bus_stop_1.lon)
            now = datetime.now()
            gmaps = googlemaps.Client(key=config('GOOGLE_MAP_API'))
            directions_result = gmaps.directions((bus_stop_1.lat, bus_stop_1.lon), (bus_stop_2.lat, bus_stop_2.lon),
                                                 mode="driving", departure_time=now)
            # The distance between two bus stop should be less than  5 km
            distance = directions_result[0]['legs'][0]['distance']['value']/1000
            print(distance)
            if distance > 5:
                return Response({"error": f"The two bus stops are too far apart {distance}km"}, status=status.HTTP_400_BAD_REQUEST)

            if bus_stop_1 == bus_stop_2:
                return Response({'error': 'The two bus stop fields must be different.'},
                                status=status.HTTP_400_BAD_REQUEST)
            if ConnectedRoute.objects.filter(bus_stop_1=bus_stop_1, bus_stop_2=bus_stop_2):
                return Response({"error": "These two bus stops are already connected."},
                                status=status.HTTP_409_CONFLICT)
            return super().create(request, *args, **kwargs)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateConnectBus(generics.RetrieveUpdateDestroyAPIView):
    queryset = ConnectedRoute.objects.all()
    serializer_class = BusConnectionSerializer
    lookup_field = 'id'
