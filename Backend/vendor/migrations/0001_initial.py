# Generated by Django 5.0.1 on 2024-03-23 17:14

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('bus', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='BusDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bus_number', models.CharField(max_length=10, unique=True)),
                ('bus_name', models.CharField(blank=True, max_length=30, unique=True)),
                ('seating_capacity', models.PositiveIntegerField()),
                ('available_seats', models.PositiveIntegerField()),
                ('identify_img', models.ImageField(null=True, upload_to='bus/')),
                ('is_active', models.BooleanField(default=True)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Route',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.DecimalField(decimal_places=2, max_digits=5)),
                ('starting_time', models.TimeField()),
                ('ending_time', models.TimeField()),
                ('is_active', models.BooleanField(default=True)),
                ('bus_detail', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='vendor.busdetail')),
                ('destination', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='destination_routes', to='bus.busstop')),
                ('origin', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='source_routes', to='bus.busstop')),
            ],
        ),
        migrations.CreateModel(
            name='wayPoints',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.PositiveSmallIntegerField()),
                ('reaching_time', models.TimeField()),
                ('route', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='waypoints', to='vendor.route')),
                ('stop', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='route_pk', to='bus.busstop')),
            ],
            options={
                'unique_together': {('route', 'order'), ('route', 'stop')},
            },
        ),
    ]
