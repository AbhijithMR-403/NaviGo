# Generated by Django 5.0.1 on 2024-03-23 17:14

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=60, null=True)),
                ('username', models.CharField(max_length=30, unique=True)),
                ('password', models.CharField(blank=True)),
                ('phone_number', models.CharField(blank=True, null=True)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('DOB', models.DateField(null=True)),
                ('profile_img', models.ImageField(null=True, upload_to='user/profile_pics/')),
                ('date_joined', models.DateTimeField(auto_now_add=True, null=True)),
                ('last_login', models.DateTimeField(auto_now_add=True, null=True)),
                ('is_active', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('is_email_verified', models.BooleanField(default=False)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_vendor', models.BooleanField(default=False)),
                ('OTP', models.IntegerField(null=True)),
                ('OTP_expire', models.DateTimeField(null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='VendorDetails',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('identify_img', models.ImageField(null=True, upload_to='vendor/identify/')),
                ('company_name', models.CharField(max_length=50, unique=True)),
                ('GSTIN', models.CharField(max_length=15, null=True, unique=True)),
                ('approve', models.BooleanField(default=False)),
                ('address', models.CharField(max_length=150, null=True)),
                ('city', models.CharField(max_length=50, null=True)),
                ('state', models.CharField(max_length=50, null=True)),
                ('country', models.CharField(default='India', max_length=50, null=True)),
                ('pincode', models.IntegerField(null=True)),
                ('user', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
