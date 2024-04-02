# Generated by Django 5.0.1 on 2024-02-14 11:36

import bus.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bus', '0006_alter_connectedroute_time'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='connectedroute',
            name='time',
        ),
        migrations.AddField(
            model_name='connectedroute',
            name='time_hlk',
            field=models.DurationField(null=True, validators=[bus.models.ConnectedRoute.validate_positive_duration]),
        ),
    ]
