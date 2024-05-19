from django.urls import path
from . import views

urlpatterns = [
    path("listuser", views.UserList.as_view(), name="listUser"),
    path("user/detail/<int:id>/", views.UserDetail.as_view(), name="listUser"),
    path("vendor/list", views.VendorApproval.as_view(), name="VendorApproval"),
    path("vendor/update/<int:user>", views.vendorDetailsUpdateApi.as_view(), name="vendorDetailsUpdateApi"),
    path("dashboard", views.DashBoardDetails.as_view(), name="dashboard"),
]
