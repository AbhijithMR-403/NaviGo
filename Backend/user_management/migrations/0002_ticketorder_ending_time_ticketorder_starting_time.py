# Generated by Django 5.0.1 on 2024-03-29 14:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_management', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='ticketorder',
            name='ending_time',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='ticketorder',
            name='starting_time',
            field=models.DateTimeField(null=True),
        ),
    ]
