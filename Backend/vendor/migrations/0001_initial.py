# Generated by Django 5.0.1 on 2024-02-22 04:45

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('bus', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='BusDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bus_number', models.CharField(max_length=10)),
                ('bus_name', models.CharField(blank=True, max_length=30)),
                ('seating_capacity', models.PositiveIntegerField()),
                ('available_seats', models.PositiveIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Route',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.DecimalField(decimal_places=2, max_digits=5)),
                ('wayPointCount', models.PositiveIntegerField()),
                ('bus_detail', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='vendor.busdetail')),
                ('destination', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='destination_routes', to='bus.busstop')),
                ('source', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='source_routes', to='bus.busstop')),
            ],
            options={
                'unique_together': {('source', 'destination')},
            },
        ),
        migrations.CreateModel(
            name='wayPoints',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.PositiveSmallIntegerField()),
                ('route', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='waypoints', to='vendor.route')),
                ('stop', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='vendor.busdetail')),
            ],
        ),
    ]
