from django.db import models

# Create your models here.

class BusStop(models.Model):
    # stop_id = models.CharField(max_length=10)
    stop_name = models.CharField(max_length=256, blank=True)
    lat = models.FloatField()
    lon = models.FloatField()

    def __str__(self):
        return f'{self.stop_name}'
