from django.urls import path
from . import views

urlpatterns = [
    path("listuser", views.UserList.as_view(), name="listUser"),
    path("user/detail/<int:id>/", views.UserDetail.as_view(), name="listUser"),
]
