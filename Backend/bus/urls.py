from django.urls import path
from . import views

urlpatterns = [
    path("add", views.BusStopLocation.as_view(), name="liststop"),
    path("list", views.BusStopLocation.as_view(), name="liststop"),
    path('delete/<int:pk>/', views.BusStopDelete.as_view(), name="deleteBusStop")
]
