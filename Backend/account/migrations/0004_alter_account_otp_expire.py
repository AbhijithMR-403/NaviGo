# Generated by Django 5.0.1 on 2024-03-20 07:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0003_alter_account_otp_expire'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='OTP_expire',
            field=models.DateTimeField(null=True),
        ),
    ]
