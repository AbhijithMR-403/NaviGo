from datetime import timedelta, datetime
from django.db import models
from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.core.validators import EmailValidator
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
# from django.utils.translation import gettext as _


class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        if not email:
            raise ValueError("User must have a email")
        if not username:
            raise ValueError("User must have an username")
        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )

        user.is_active = False
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password):
        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            password=password,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_active = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class Account(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=60, null=True)
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(blank=True)
    phone_number = models.CharField(blank=True, null=True)
    email = models.EmailField(max_length=254, unique=True)
    DOB = models.DateField(null=True)
    profile_img = models.ImageField(upload_to='user/profile_pics/', null=True)
    date_joined = models.DateTimeField(auto_now_add=True, null=True)
    last_login = models.DateTimeField(auto_now_add=True, null=True)
    is_active = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_email_verified = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_vendor = models.BooleanField(default=False)
    OTP = models.IntegerField(null=True)
    OTP_expire = models.DateTimeField(null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.username


class VendorDetails(models.Model):
    user = models.OneToOneField(
        Account, on_delete=models.CASCADE, null=True, blank=True)
    identify_img = models.ImageField(upload_to='vendor/identify/', null=True)
    company_name = models.CharField(max_length=50, unique=True)
    GSTIN = models.CharField(max_length=15, unique=True, null=True)
    approve = models.BooleanField(default=False)
    address = models.CharField(max_length=150, null=True)
    city = models.CharField(max_length=50, null=True)
    state = models.CharField(max_length=50, null=True)
    country = models.CharField(max_length=50, null=True, default='India')
    pincode = models.IntegerField(null=True)


updating_instance = False


@receiver(post_save, sender=Account)
def update_otp_expire_on_change(sender, instance, created, **kwargs):

    global updating_instance
    print(kwargs)
    print(created)

    if updating_instance:
        return
    previous_otp = None
    if instance.pk:
        try:
            previous_otp = Account.objects.get(pk=instance.pk).OTP
        except Account.DoesNotExist:
            previous_otp = None
    if not created and int(instance.OTP) is not int(previous_otp):
        # Check if the instance is not newly created and OTP has changed
        instance.OTP_expire = (
            datetime.now() + timedelta(seconds=15))
        updating_instance = True
        try:
            instance.save()
        finally:
            updating_instance = False
    return
