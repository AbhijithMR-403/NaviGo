# Generated by Django 5.0.1 on 2024-03-17 13:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vendor', '0009_remove_route_waypointcount'),
    ]

    operations = [
        migrations.AddField(
            model_name='busdetail',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='route',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
