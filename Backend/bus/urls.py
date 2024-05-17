from django.urls import path
from . import views

# */bus/**
urlpatterns = [
    path("stop/add", views.BusStopLocation.as_view(), name="addStop"),
    path("stop/list", views.BusStopLocation.as_view(), name="listStop"),
    path('delete/<int:pk>/', views.BusStopDelete.as_view(), name="deleteBusStop"),
    path('connect', views.ConnectBus.as_view(), name="ConnectBus"),
    path('connect/list', views.ConnectBusList.as_view(), name="ConnectBus"),
    path('connect/update/<int:id>', views.UpdateConnectBus.as_view(), name="UpdateConnectBus"),
    path('connect/delete/<int:id>', views.UpdateConnectBus.as_view(), name="deleteConnectBus"),
    path('route/available', views.AvailableRoutes.as_view(), name='availableRoutes'),
]
