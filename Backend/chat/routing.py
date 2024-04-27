from django.urls import re_path
from Backend.consumers import ChatConsumer

websocket_urlpatterns = [
    re_path("ws/chat/public_room/", ChatConsumer.as_asgi()),
]