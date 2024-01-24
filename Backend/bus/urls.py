from django.urls import path
from . import views

urlpatterns = [
    path("add", views.BusStopLocation.as_view(), name="listUser"),
]
