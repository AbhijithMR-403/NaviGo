from django.db import models
from account.models import Account
from bus.models import BusStop
from vendor.models import BusDetail, Route
import uuid

# Create your models here.


class TicketOrder(models.Model):
    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('DELIVERED', 'Delivered'),
        ('RETURN', 'Return')
    )
    ticket_order_id = models.UUIDField(default=uuid.uuid4, editable=False)
    quantity = models.IntegerField(default=1)
    user_id = models.ForeignKey(
        Account, on_delete=models.CASCADE, related_name='user_tickets')
    start_stop = models.ForeignKey(BusStop, on_delete=models.CASCADE, related_name='starting_bus_stop')
    end_stop = models.ForeignKey(BusStop, on_delete=models.CASCADE, related_name='ending_bus_stop')
    start_time = models.DateTimeField(null=True)
    end_time = models.DateTimeField(null=True)
    route_id = models.ForeignKey(
        Route, on_delete=models.CASCADE, related_name="order_route")
    status = models.CharField(
        max_length=25, choices=STATUS_CHOICES, default='PENDING')
    sub_total = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    tax = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    total = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.ticket_order_id}'

    class Meta:
        ordering = ['-created']


class Payment(models.Model):
    STATUS_CHOICES = (
        ('SUCCESS', 'Success'),
        ('FAILURE', 'Failure'),
        ('PENDING', 'Pending')
    )
    ticket = models.OneToOneField(
        TicketOrder, on_delete=models.CASCADE, related_name='payment')
    status = models.CharField(
        max_length=12, choices=STATUS_CHOICES, default='Pending')
    method = models.CharField(max_length=8, default='RazorPay')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    provider_order_id = models.CharField(
        max_length=40, null=False, blank=False)
    payment_id = models.CharField(max_length=36, null=False, blank=False)
    signature_id = models.CharField(max_length=128, null=False, blank=False)
    # provider_order_id = models.CharField(max_length=64)
    created = models.DateTimeField(auto_now_add=True)

    def mark_as_paid(self):
        self.status = 'paid'
        self.save()
