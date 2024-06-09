from django.urls import path
from chat.consumers import ChatConsumer

websocket_urlpatterns = [
    path("ws/chat/<int:ticketID>", ChatConsumer.as_asgi()),
]