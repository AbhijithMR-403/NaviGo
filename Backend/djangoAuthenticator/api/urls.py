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
    path('login', views.UserLogin.as_view(), name='UserLogin'),
    path('home', views.HomeView.as_view(), name='home'),
    path('logout', views.LogoutView.as_view(), name='logout'),
]
