# Generated by Django 5.0.1 on 2024-02-08 13:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bus', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='connected_route',
            new_name='ConnectedRoute',
        ),
    ]
