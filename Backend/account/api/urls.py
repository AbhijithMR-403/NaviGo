from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views


# */auth/**
urlpatterns = [
    # Generate Token (Only for testing purpose)
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # To Generate refreshed token using existing token
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    #  User Registration API
    path("register", views.RegisterView.as_view(), name="user-register"),
    path("otp", views.Send_OTP.as_view(), name="user-otp"),
    path('login', views.UserLogin.as_view(), name='UserLogin'),
    path('logout', views.LogoutView.as_view(), name='logout'),
    path('otp/verify', views.OtpVerify.as_view(), name='otpVerify'),
    path("details", views.UserDetails.as_view(), name="user-details"),
    path("vendor/details", views.AddVendorDetails.as_view(), name="VendorDetails"),
    path("logout", views.LogoutView.as_view(), name="LogoutView"),
    path("google", views.UserGoogleAuth.as_view(), name="UserGoogleAuth"),
    path("update/password", views.UpdatePassword.as_view(), name="UpdatePassword"),
]