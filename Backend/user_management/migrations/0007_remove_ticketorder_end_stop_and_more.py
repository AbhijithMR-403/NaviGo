# Generated by Django 5.0.1 on 2024-03-17 13:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user_management', '0006_rename_route_id_ticketorder_route_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ticketorder',
            name='end_stop',
        ),
        migrations.RemoveField(
            model_name='ticketorder',
            name='end_time',
        ),
        migrations.RemoveField(
            model_name='ticketorder',
            name='start_stop',
        ),
        migrations.RemoveField(
            model_name='ticketorder',
            name='start_time',
        ),
    ]
