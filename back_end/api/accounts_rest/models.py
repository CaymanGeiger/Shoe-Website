from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
    )
from django.utils import timezone


class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        print("create_user j12nroufb23hiwqfbwqhbfhkjwqabdhq")
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(username, email, password, **extra_fields)


class Account(AbstractBaseUser, PermissionsMixin):
    STATUS_CHOICES = (
        ('basic', 'Basic'),
        ('premium', 'Premium'),
        ('vip', 'Vip'),
    )
    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(unique=True)
    date_joined = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    user_level = models.CharField(max_length=200, choices=STATUS_CHOICES, default='basic')
    profile_picture = models.URLField(max_length=1000, default="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREPvmzUnSZWU_AQX3YpiUS5kpMldREZhYKMQ&usqp=CAU")

    objects = CustomUserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email", "first_name", "last_name"]

    @property
    def serialized_favorites(self):
        return [
            {
                "shoe": favorite.shoe.serialized_shoe,
                "favorite_id": favorite.id,
                "shoe_id": favorite.shoe.id,
            }
            for favorite in self.favorites.all()
        ]

    def __str__(self):
        return self.username
