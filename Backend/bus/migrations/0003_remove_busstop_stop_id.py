# Generated by Django 5.0.1 on 2024-01-24 06:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bus', '0002_rename_bus_stop_busstop'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='busstop',
            name='stop_id',
        ),
    ]
