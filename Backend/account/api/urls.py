from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("register", views.RegisterView.as_view(), name="user-register"),
    path("otp", views.Send_OTP.as_view(), name="user-otp"),
    path('login', views.UserLogin.as_view(), name='UserLogin'),
    path('home', views.HomeView.as_view(), name='home'),
    path('logout', views.LogoutView.as_view(), name='logout'),
    path('otp/verify', views.OtpVerify.as_view(), name='otpverify'),
    path("details", views.UserDetails.as_view(), name="user-details"),
    path("vendor/reg", views.VendorRegister.as_view(), name="VendorRegister"),
    path("vendor/details", views.AddVendorDetails.as_view(), name="VendorDetails"),
    path("logout", views.LogoutView.as_view(), name="LogoutView"),
    path("google", views.UserGoogleAuth.as_view(), name="UserGoogleAuth"),
]