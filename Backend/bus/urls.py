from django.urls import path
from . import views

urlpatterns = [
    path("add", views.BusStopLocation.as_view(), name="liststop"),
    path("list", views.BusStopLocation.as_view(), name="liststop"),
    path('delete/<int:pk>/', views.BusStopDelete.as_view(), name="deleteBusStop"),
    path('connect', views.ConnectBus.as_view(), name="ConnectBus"),
    path('connect/list', views.ConnectBusList.as_view(), name="ConnectBus"),
    path('connect/update/<int:id>', views.UpdateConnectBus.as_view(), name="UpdateConnectBus"),
    path('connect/delete/<int:id>', views.UpdateConnectBus.as_view(), name="UpdateConnectBus")
]
