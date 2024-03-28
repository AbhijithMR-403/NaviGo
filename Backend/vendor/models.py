from django.core.exceptions import ValidationError
from django.db import models
from account.models import Account
from bus.models import BusStop
# Create your models here.


class BusDetail(models.Model):
    user_id = models.ForeignKey(Account, on_delete=models.CASCADE)
    bus_number = models.CharField(max_length=10, unique=True)
    bus_name = models.CharField(max_length=30, blank=True, unique=True)
    # route = models.ForeignKey('Route', on_delete=models.CASCADE)
    seating_capacity = models.PositiveIntegerField()
    available_seats = models.PositiveIntegerField()
    identify_img = models.ImageField(upload_to='bus/', null=True)
    is_active = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        if not self.available_seats:
            self.available_seats = self.seating_capacity
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.bus_number} - {self.bus_name}"


class Route(models.Model):

    origin = models.ForeignKey(
        BusStop, on_delete=models.CASCADE, related_name='source_routes')
    destination = models.ForeignKey(
        BusStop, on_delete=models.CASCADE, related_name='destination_routes')
    price = models.DecimalField(max_digits=5, decimal_places=2)
    bus_detail = models.ForeignKey(
        BusDetail, on_delete=models.CASCADE, blank=False)
    starting_time = models.TimeField()
    ending_time = models.TimeField()
    is_active = models.BooleanField(default=True)


    # class Meta:
    #     unique_together = ['origin', 'destination', 'bus_detail', 'starting_time', 'ending_time']

    def __str__(self) -> str:
        return f"{self.origin}-{self.destination}"

    def clean(self):

        if self.origin == self.destination:
            raise ValidationError('Both stop cannot to the same')
        # check_stop = Route.objects.filter(
        #     origin=self.origin, destination=self.destination, bus_detail=self.bus_detail).exists()
        # if check_stop:
        #     raise ValidationError("This bus in this route already exists")

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)


# You add distance
class wayPoints(models.Model):
    stop = models.ForeignKey(BusStop, related_name="route_pk", on_delete=models.CASCADE)
    order = models.PositiveSmallIntegerField()
    route = models.ForeignKey(
        Route, related_name="waypoints", on_delete=models.CASCADE)
    reaching_time = models.TimeField()

    class Meta:
        unique_together = [['route', 'stop'], ['route', 'order']]

    def save(self, *args, **kwargs):
        if not self.order:
            last_order = wayPoints.objects.filter(route=self.route).order_by('-order').first()
            if last_order:
                self.order = last_order.order + 1
            else:
                self.order = 1
        self.clean()
        super().save(*args, **kwargs)
