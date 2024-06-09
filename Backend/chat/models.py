from django.db import models
from account.models import Account
from user_management.models import TicketOrder

# Create your models here.


class Message(models.Model):
    user = models.ForeignKey(
        Account, on_delete=models.CASCADE, related_name='message_user')
    ticket = models.ForeignKey(
        TicketOrder, on_delete=models.CASCADE, related_name='message_ticket')
    body = models.CharField(max_length=9000)
