# Generated by Django 5.0.1 on 2024-01-24 08:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0006_remove_vendordetails_is_vendor'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='phone_number',
            field=models.CharField(blank=True, null=True),
        ),
    ]
