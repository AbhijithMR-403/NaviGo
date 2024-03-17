from django.db import models
from account.models import Account
from bus.models import BusStop
from vendor.models import BusDetail
# Create your models here.


class TicketOrder(models.Model):
    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('DELIVERED', 'Delivered'),
        ('RETURN', 'Return')
    )
    ticket_order_id = models.CharField(max_length=32, unique=True)
    user_id = models.ForeignKey(
        Account, on_delete=models.CASCADE, related_name='user_tickets')
    bus_detail = models.ForeignKey(
        BusDetail, on_delete=models.CASCADE, related_name='bus_tickets')
    sub_total = models.DecimalField(max_digits=10, decimal_places=2)
    tax = models.DecimalField(max_digits=5, decimal_places=2)
    status = models.CharField(
        max_length=25, choices=STATUS_CHOICES, default='PENDING')
    start_time = models.TimeField()
    end_time = models.TimeField()
    start_stop = models.ForeignKey(
        BusStop, on_delete=models.CASCADE, related_name="order_start_stops")
    end_stop = models.ForeignKey(
        BusStop, on_delete=models.CASCADE, related_name="order_end_stops")
    total = models.DecimalField(max_digits=10, decimal_places=2)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.order_id

    class Meta:
        ordering = ['-created']


class Payment(models.Model):
    STATUS_CHOICES = (
        ('PAID', 'Paid'),
        ('UNPAID', 'Unpaid')
    )
    ticket = models.OneToOneField(
        TicketOrder, on_delete=models.CASCADE, related_name='payment')
    status = models.CharField(
        max_length=6, choices=STATUS_CHOICES, default='unpaid')
    method = models.CharField(max_length=8, default='RazorPay')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_id = models.CharField(max_length=64)
    created = models.DateTimeField(auto_now_add=True)

    def mark_as_paid(self):
        self.status = 'paid'
        self.save()
