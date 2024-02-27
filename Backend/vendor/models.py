from django.core.exceptions import ValidationError
from django.db import models
from bus.models import BusStop
# Create your models here.


class BusDetail(models.Model):
    bus_number = models.CharField(max_length=10)
    bus_name = models.CharField(max_length=30, blank=True)
    # route = models.ForeignKey('Route', on_delete=models.CASCADE)
    seating_capacity = models.PositiveIntegerField()
    available_seats = models.PositiveIntegerField()
    identify_img = models.ImageField(upload_to='bus/', null=True)

    def save(self, *args, **kwargs):
        if not self.available_seats:
            self.available_seats = self.seating_capacity
        super().save(*args, **kwargs)

    def __str__(self):
        return self.bus_number + "-" + self.bus_name


class Route(models.Model):

    origin = models.ForeignKey(
        BusStop, on_delete=models.CASCADE, related_name='source_routes')
    destination = models.ForeignKey(
        BusStop, on_delete=models.CASCADE, related_name='destination_routes')
    price = models.DecimalField(max_digits=5, decimal_places=2)
    bus_detail = models.ForeignKey(
        BusDetail, on_delete=models.CASCADE, blank=False)
    wayPointCount = models.PositiveIntegerField()

    class Meta:
        unique_together = ['origin', 'destination']

    def __str__(self) -> str:
        return f"{self.origin}-{self.destination}"


class wayPoints(models.Model):
    stop = models.ForeignKey(BusStop, on_delete=models.CASCADE)
    order = models.PositiveSmallIntegerField()
    route = models.ForeignKey(
        Route, related_name="waypoints", on_delete=models.CASCADE)

    class Meta:
        unique_together = [['route', 'stop'], ['route', 'order']]

    def clean(self):
        waypoints_with_origin = wayPoints.objects.filter(
            route__origin=self.stop)
        if waypoints_with_origin.exists():
            raise ValidationError('Origin cannot be used in any waypoints.')

        waypoints_with_destination = wayPoints.objects.filter(
            route__destination=self.stop)
        if waypoints_with_destination.exists():
            raise ValidationError(
                'Destination cannot be used in any waypoints.')

    def save(self, *args, **kwargs):
        self.origin = wayPoints.objects.filter(stop=self.stop,  route=self.route).count() + 1
        self.clean()
        super().save(*args, **kwargs)
