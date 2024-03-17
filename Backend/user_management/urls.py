from django.urls import path
from . import views

urlpatterns = [
    path("details/<int:id>/", views.UserDetail.as_view(), name="listUser"),
    path("details/update/<int:id>/", views.UserUpdateDetailView.as_view(), name="listUser"),
    path("filter/bus", views.FilterBusView.as_view(), name="FilterBus"),
    path("bus/route/list", views.BusRouteListView.as_view(), name="BusRouteList"),
]
