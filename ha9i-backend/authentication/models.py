from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.core.exceptions import ValidationError
import re

class CitizenUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        extra_fields.setdefault('username', email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    username = models.CharField(max_length=150, unique=True, null=True, blank=True)
    email = models.EmailField(unique=True)
    
    national_id = models.CharField(max_length=18, null=True, blank=True, verbose_name="National Identification Number (NIN)")
    passport_number = models.CharField(max_length=20, null=True, blank=True, verbose_name="Passport Number")

    objects = CitizenUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def clean(self):
        super().clean()
        
        # Ensure either NIN or Passport is provided (only for citizens/non-staff users)
        if not self.is_staff and not self.is_superuser:
            if not self.national_id and not self.passport_number:
                raise ValidationError("يجب إدخال رقم التعريف الوطني أو رقم جواز السفر للتحقق من هوية المواطن. (Either National ID or Passport is required)")

        # Validate NIN consists of exactly 18 digits
        if self.national_id:
            if not re.match(r'^\d{18}$', self.national_id):
                raise ValidationError("رقم التعريف الوطني يجب أن يتكون من 18 رقماً. (NIN must be exactly 18 digits)")

    def save(self, *args, **kwargs):
        self.username = self.email
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"
