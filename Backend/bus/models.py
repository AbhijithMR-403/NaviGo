from django.db import models
from django.core.exceptions import ValidationError
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.


class BusStop(models.Model):
    stop_name = models.CharField(max_length=256, blank=True)
    lat = models.FloatField()
    lon = models.FloatField()

    def __str__(self):
        return f'{self.stop_name}'


class busStopImg(models.Model):
    stop = models.ForeignKey(BusStop, on_delete=models.CASCADE)
    stop_img = models.FileField(upload_to="bus/stop/", null=True)

    def __str__(self):
        return f"{self.stop}-{self.stop_img}"


class ConnectedRoute(models.Model):
    bus_stop_1 = models.ForeignKey(
        BusStop, on_delete=models.CASCADE, related_name='stop1')
    bus_stop_2 = models.ForeignKey(
        BusStop, on_delete=models.CASCADE, related_name='stop2')
    distance = models.FloatField(blank=True, null=True)
    time = models.TimeField(blank=True, null=True)

    def clean(self):

        if self.bus_stop_1 == self.bus_stop_2:
            raise ValidationError('Both stop cannot to the same')
        count_stop1 = ConnectedRoute.objects.filter(
            bus_stop_1=self.bus_stop_1).count()
        check_stop = ConnectedRoute.objects.filter(
            bus_stop_2=self.bus_stop_2, bus_stop_1=self.bus_stop_1).exists()
        print(count_stop1, check_stop)
        if check_stop:
            raise ValidationError("This route already exists")

        if count_stop1 > 4:
            raise ValidationError('Only 4 connections allowed.')

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)


@receiver(post_save, sender=ConnectedRoute)
def trigger_reverse_route_creation(sender, instance, **kwargs):
    if kwargs['created'] is True:
        reverse_connected_route, created = sender.objects.get_or_create(
            bus_stop_1=instance.bus_stop_2,
            bus_stop_2=instance.bus_stop_1,
            defaults={'distance': instance.distance, 'time': instance.time}
        )
        if (reverse_connected_route.distance, reverse_connected_route.time) != (instance.distance, instance.time):
            reverse_connected_route.distance = instance.distance

            reverse_connected_route.time = instance.time
            reverse_connected_route.save(update_fields=['distance', 'time'])
