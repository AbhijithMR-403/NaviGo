import json
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics
from .models import BusStop, ConnectedRoute
from .serializers import BusStopSerializer, BusConnectionSerializer, BusConnectionListSerializer
from .algorithm import algorithmAllPaths
from rest_framework.response import Response
from rest_framework import status
import googlemaps
from rest_framework.permissions import IsAuthenticated
from datetime import datetime
from decouple import config

# Create your views here.


class BusStopDelete(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = BusStop.objects.all()
    serializer_class = BusStopSerializer


# To List Bus Stop
class BusStopLocation(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
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
            print(bus_stop_1.lat, bus_stop_1.lng)
            if bus_stop_1 == bus_stop_2:
                return Response({'error': 'The two bus stop fields must be different.'},
                                status=status.HTTP_400_BAD_REQUEST)
            if ConnectedRoute.objects.filter(bus_stop_1=bus_stop_1, bus_stop_2=bus_stop_2):
                return Response({"error": "These two bus stops are already connected."},
                                status=status.HTTP_409_CONFLICT)
            now = datetime.now()
            gmaps = googlemaps.Client(key=config('GOOGLE_MAP_API'))
            directions_result = gmaps.directions((bus_stop_1.lat, bus_stop_1.lng), (bus_stop_2.lat, bus_stop_2.lng),
                                                 mode="", departure_time=now)
            # Decoding time and distance
            distance = directions_result[0]['legs'][0]['distance']['value']/1000
            time = directions_result[0]['legs'][0]['duration']['value']

            serializer.validated_data['distance'] = distance
            serializer.validated_data['time'] = time
            # serializer.save()
            # Save the serializer data
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            print(serializer, '\n\n')
            print('yep this is it man', headers)
            # The distance between two bus stop should be less than 5 km
            if distance > 4:
                return Response({"error": f"The two bus stops are too far a part {distance}km"}, status=status.HTTP_400_BAD_REQUEST)

            return Response({"message": "successfully connected."},
                            status=status.HTTP_200_OK)

            # return super().create(request, *args, **kwargs)

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Deleete this after ward as there is alread a view for both list and create
class ConnectBusList(generics.ListCreateAPIView):
    queryset = ConnectedRoute.objects.all()
    serializer_class = BusConnectionListSerializer


class UpdateConnectBus(generics.RetrieveUpdateDestroyAPIView):
    queryset = ConnectedRoute.objects.all()
    serializer_class = BusConnectionSerializer
    lookup_field = 'id'


class AvailableRoutes(APIView):
    def get(self, request):
        print(request.query_params)
        if 'origin' not in request.query_params:
            return Response({'origin': 'origin is not available'})
        if 'destination' not in request.query_params:
            return Response({'destination': 'destination is not available'})
        # Check the origin and destination are numbers
        try:
            origin = int(request.query_params['origin'])
            destination = int(request.query_params['destination'])
        except Exception:
            return Response({'error': 'both origin and destination must be numbers'}, status=status.HTTP_400_BAD_REQUEST)
        wayPoints = algorithmAllPaths(origin, destination)
        serialized_wayPoints = [[BusStopSerializer(bus_stop).data for bus_stop in sublist if bus_stop.id not in [origin, destination]] for sublist in wayPoints]

        if origin and destination:
            print(origin, destination)
            return Response({'origin': origin, 'destination': destination, "wayPoint": serialized_wayPoints})
        else:
            return Response({'error': 'No stops provided'})
