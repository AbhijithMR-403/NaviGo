# Generated by Django 5.0.1 on 2024-02-28 17:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vendor', '0002_alter_busdetail_bus_name_alter_busdetail_bus_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='route',
            name='wayPointCount',
            field=models.PositiveIntegerField(null=True),
        ),
    ]