from django.urls import path
from . import views

urlpatterns = [
    path("bus/create", views.BusCreateView.as_view(), name="BusCreateView"),
    path("bus/list/<int:user_id>", views.BusListView.as_view(), name="BusListView"),
    path("detail/<int:user>", views.vendorDetailsView.as_view(), name="vendorDetailsView"),
    path("route/create", views.BusRouteCreateView.as_view(), name="BusRouteView"),
    path("waypoints/list", views.WayPointListView.as_view(), name="BusRouteListView"),
    path("waypoint/create", views.WayPointCreateView.as_view(), name="BusRouteCreateView"),
    # Waypoint bulk create
    path("waypoint/bulk/create", views.WayPointBulkCreateView.as_view(), name="BusRouteCreateView"),
    path("view/bus/route/<int:user_id>", views.RouteWayPointView.as_view(), name="BusRouteCreateView"),
]
