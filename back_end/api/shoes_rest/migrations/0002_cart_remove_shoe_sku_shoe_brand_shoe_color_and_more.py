# Generated by Django 4.2.4 on 2023-12-11 23:46

from decimal import Decimal
from django.conf import settings
import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("shoes_rest", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Cart",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "account",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="account_cart",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.RemoveField(
            model_name="shoe",
            name="sku",
        ),
        migrations.AddField(
            model_name="shoe",
            name="brand",
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name="shoe",
            name="color",
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name="shoe",
            name="description",
            field=models.TextField(max_length=1000, null=True),
        ),
        migrations.AddField(
            model_name="shoe",
            name="picture_url",
            field=models.URLField(max_length=5000, null=True),
        ),
        migrations.AddField(
            model_name="shoe",
            name="price",
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name="shoe",
            name="sizes",
            field=django.contrib.postgres.fields.ArrayField(
                base_field=models.FloatField(), blank=True, null=True, size=None
            ),
        ),
        migrations.AlterField(
            model_name="shoe",
            name="name",
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.CreateModel(
            name="Rating",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "rating",
                    models.DecimalField(
                        choices=[
                            (Decimal("1"), Decimal("1")),
                            (Decimal("1.5"), Decimal("1.5")),
                            (Decimal("2"), Decimal("2")),
                            (Decimal("2.5"), Decimal("2.5")),
                            (Decimal("3"), Decimal("3")),
                            (Decimal("3.5"), Decimal("3.5")),
                            (Decimal("4"), Decimal("4")),
                            (Decimal("4.5"), Decimal("4.5")),
                            (Decimal("5"), Decimal("5")),
                        ],
                        decimal_places=1,
                        max_digits=2,
                        null=True,
                    ),
                ),
                ("rating_description", models.CharField(max_length=400, null=True)),
                (
                    "account",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="review_account",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "shoe",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="rating_set",
                        to="shoes_rest.shoe",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="CartItem",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("quantity", models.PositiveIntegerField(default=1)),
                (
                    "cart",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="cart_set",
                        to="shoes_rest.cart",
                    ),
                ),
                (
                    "shoe",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to="shoes_rest.shoe",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Favorite",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "account",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="favorites",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "shoe",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="shoe_set",
                        to="shoes_rest.shoe",
                    ),
                ),
            ],
            options={
                "unique_together": {("shoe", "account")},
            },
        ),
    ]