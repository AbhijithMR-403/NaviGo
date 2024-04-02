
from channels.generic.websocket import AsyncWebsocketConsumer
import json
from .models import NotificationRoom
from channels.layers import get_channel_layer
from channels.db import database_sync_to_async
from account.models import Account
import random
import string


class NotificationConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.room_name = None
        self.room = None
        self.user = None
        self.room_group_name = None
        self.data = None
        self.rooms = None

    async def connect(self):
        print("Connecting...")
        self.userr = self.scope["url_route"]["kwargs"]["username"] or "Anonymous"
        if not self.userr or len(self.userr) > 100:
            await self.close(code=400)
            return
        self.user = await self.get_or_create_user()
        self.room = await self.get_or_create_room()
        self.room_group_name = self.room_name
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        await self.create_online_user()

        await self.get_unread_messages()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
        await self.remove_online_user()

    async def send_notification(self, event):

        await self.send(
            text_data=json.dumps(
                {"type": "notification", "user": event["user"]})
        )

    async def send_chat_notification(self, event):

        await self.send(
            text_data=json.dumps(
                {"type": "chat_notification", "user": event["user"]})
        )

    async def get_unread_messages(self):
        self.rooms = await self.get_rooms()
        self.data = await self.unread_messages()
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "send_unread_messages",
                "un_read": self.data,
            },
        )

    async def send_unread_messages(self, event):
        unread = event["un_read"]
        await self.send(text_data=json.dumps({"type": "unread_messages", "unread_messages": unread}))

    def generate_mixed_string(self, length=10):
        characters = string.ascii_letters
        mixed_string = "".join(random.choice(characters)
                               for _ in range(length))
        return mixed_string

    @database_sync_to_async
    def get_or_create_room(self):
        try:
            room = NotificationRoom.objects.get(user=self.user)
            self.room_name = room.name
            print(self.room_name)
        except:
            self.room_name = self.generate_mixed_string()
            room = NotificationRoom.objects.create(
                user=self.user, name=self.room_name)
        return room

    @database_sync_to_async
    def get_or_create_user(self):
        userr = Account.objects.get_or_create(username=self.userr)
        user = Account.objects.get(username=self.userr)
        print("user_created", user.id)
        return user

    @database_sync_to_async
    def create_online_user(self):
        self.user.is_online = True
        self.user.save()

    @database_sync_to_async
    def remove_online_user(self):
        self.user.is_online = False
        self.user.save()

    @database_sync_to_async
    def get_rooms(self):
        username = self.user
        user = Account.objects.get(username=username)
        queryset = Room.objects.filter(userslist=user)

        roomlist = list(queryset)
        return roomlist
