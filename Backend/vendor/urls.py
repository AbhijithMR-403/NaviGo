from django.urls import path
from . import views

urlpatterns = [
    path("bus/create", views.BusCreateView.as_view(), name="BusCreateView"),
    path("bus/list", views.BusListView.as_view(), name="BusListView"),
    path("detail/<int:user>", views.vendorDetailsView.as_view(), name="vendorDetailsView"),
    path("route/create", views.BusRouteView.as_view(), name="BusRouteView"),
    path("waypoint/create", views.RouteWayPointView.as_view(), name="BusRouteView"),

]
