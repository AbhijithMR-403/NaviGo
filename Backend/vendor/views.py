from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import BusAddSerializer, BusDetailSerializer, BusCreateRouteSerializer, RouteWayPointCreateSerializer, RouteWayPointListSerializer, BusListRouteSerializer, RouteWayPointDetailSerializer
from rest_framework import generics
from .models import BusDetail, Route, wayPoints
from account.models import VendorDetails
from admin_management.serializers import VendorDetailsSerializer
from rest_framework.permissions import IsAuthenticated
from datetime import timedelta

# Create your views here.


# Create Bus Detail View
class BusCreateView(generics.CreateAPIView):
    queryset = BusDetail.objects.all()
    serializer_class = BusAddSerializer
    permission_classes = [IsAuthenticated]


# List all the Buses available
# ? This needs to change, as a vendor need not view all the buses but only their own
class BusListView(generics.ListAPIView):
    queryset = BusDetail.objects.all()
    serializer_class = BusDetailSerializer
    permission_classes = [IsAuthenticated]
    # lookup_field = 'user_id'

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        print("User ID:", user_id)
        queryset = BusDetail.objects.filter(user_id=user_id)
        print("Filtered queryset:", queryset)
        return queryset


class vendorDetailsView(generics.RetrieveUpdateAPIView):
    queryset = VendorDetails.objects.all()
    serializer_class = VendorDetailsSerializer
    lookup_field = 'user'


# Create bus Route View
class BusRouteCreateView(generics.CreateAPIView):
    queryset = Route.objects.all()
    serializer_class = BusCreateRouteSerializer

# List WayPoints


class WayPointListView(generics.ListCreateAPIView):
    queryset = wayPoints.objects.all()
    serializer_class = RouteWayPointListSerializer


# Create waypoints
    # ? I might remove this
class WayPointCreateView(generics.CreateAPIView):
    queryset = wayPoints.objects.all()
    serializer_class = RouteWayPointCreateSerializer


# To List all Route and It's waypoint, bus details
class RouteWayPointView(generics.ListAPIView):
    queryset = Route.objects.all()
    serializer_class = RouteWayPointDetailSerializer

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        print('this is the thing', user_id)
        queryset = Route.objects.select_related('origin').filter(bus_detail__user_id=user_id)
        print("Filtered queryset:", queryset)
        return queryset


class WayPointBulkCreateView(generics.CreateAPIView):
    queryset = wayPoints.objects.all()
    serializer_class = RouteWayPointCreateSerializer

    def create(self, request, *args, **kwargs):
        # ?
        if isinstance(request.data['seat'], list):
            seats = request.data.pop('seat')
            models = []
            for seat in seats:
                # validate each model with one time slot
                request.data['seat'] = seat
                serializer = RouteWayPointCreateSerializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                models.append(serializer)
            result_serializer = RouteWayPointCreateSerializer(models, many=True)
            return Response(result_serializer.data)
        # Save ticket as usual
        serializer = RouteWayPointCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

        #     return Response("Waypoints created successfully", status=status.HTTP_201_CREATED)
        # except Exception as e:
        #     return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)