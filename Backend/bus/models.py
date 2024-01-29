from django.db import models

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


class connected_route(models.Model):
    bus_stop_1 = models.ForeignKey(
        BusStop, on_delete=models.CASCADE, related_name='stop1')
    bus_stop_2 = models.ForeignKey(
        BusStop, on_delete=models.CASCADE, related_name='stop2')
    distance = models.FloatField(blank=True, null=True)
    time = models.TimeField(blank=True, null=True)


# class Route(models.Model):
#     route_no = models.IntegerField(primary_key=True)
#     route_name = models.CharField(max_length=32)
#     start_time = models.TimeField()
#     end_time = models.TimeField()
