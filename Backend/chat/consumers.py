import json
from channels.generic.websocket import AsyncWebsocketConsumer
# from channels.layers import get_channel_layer
# from asgiref.sync import async_to_sync
# from django.http import HttpRequest
from django.contrib.auth.models import User
# from rest_framework.request import Request
from .models import Message
from user_management.models import TicketOrder as Ticket
# from .serializers import MessageSerializer
from asgiref.sync import sync_to_async


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print('this reach ehre i thinkṁan')
        self.ticketID = self.scope['url_route']['kwargs']['ticketID']
        self.room_group_name = f'chat_{self.ticketID}'

        print(f'Connecting to room group: {self.room_group_name}')

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()
        print(f'WebSocket connected: {self.channel_name}')

    async def disconnect(self, close_code):
        print(f'WebSocket disconnecting: {self.channel_name}, close_code: {close_code}')

        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        print(f'WebSocket disconnected: {self.channel_name}')


    async def receive(self, text_data):
        print("received")
        print(text_data)
        text_data1 = json.loads(text_data)
        data_id = text_data1['problemID']
        ticket = await sync_to_async(Ticket.objects.get)(id=data_id)
        username = text_data1['username']
        user = await sync_to_async(User.objects.get)(username=username)

        message = await sync_to_async(Message.objects.create)(
            user=user,
            ticket=ticket,
            body=text_data1['body']
        )

        # Since the message has been created and saved to the database, we can send a success message.
        #i.e  in django, when you call the create method on a model's manager (like Message.objects.create(...)), it not only creates a new instance of the model but also saves it to the database immediately
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat.message",
                "message": "successful",
            }
        )

    async def chat_message(self, event):
        message = event["message"]

        await self.send(text_data=json.dumps({"message": message}))