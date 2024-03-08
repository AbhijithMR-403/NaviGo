from django.urls import path
from . import views

urlpatterns = [
    path("details/<int:id>/", views.UserDetail.as_view(), name="listUser"),
    path("details/update/<int:id>/", views.UserUpdateDetailView.as_view(), name="listUser"),
]
