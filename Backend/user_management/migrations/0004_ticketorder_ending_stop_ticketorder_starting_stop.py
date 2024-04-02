# Generated by Django 5.0.1 on 2024-03-23 12:47

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bus', '0003_remove_busstop_user_id'),
        ('user_management', '0003_remove_ticketorder_ending_stop_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='ticketorder',
            name='ending_stop',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='ending_bus_stop', to='bus.busstop'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='ticketorder',
            name='starting_stop',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='starting_bus_stop', to='bus.busstop'),
            preserve_default=False,
        ),
    ]
