from django.db import models
from django.urls import reverse
from django.utils import timezone
from decimal import Decimal
from django.contrib.postgres.fields import ArrayField


class AccountVO(models.Model):
    username = models.CharField(max_length=150)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField()
    date_joined = models.DateTimeField(default=timezone.now)
    user_level = models.CharField(max_length=20)
    profile_picture = models.URLField(max_length=5000)

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


class Shoe(models.Model):
    name = models.CharField(max_length=100, null=True)
    price = models.FloatField(null=True)
    sizes = ArrayField(models.FloatField(), null=True, blank=True)
    color = models.CharField(max_length=100, null=True)
    brand = models.CharField(max_length=100, null=True)
    picture_url = models.URLField(max_length=5000, null=True)
    description = models.TextField(max_length=1000, null=True)

    @property
    def serialized_shoe(self):
        return {
            "name": self.name,
            "id": self.id,
            "price": self.price,
            "sizes": self.sizes,
            "color": self.color,
            "brand": self.brand,
            "picture_url": self.picture_url,
            "description": self.description,
            "serialized_ratings": self.serialized_ratings
        }

    @property
    def serialized_ratings(self):
        ratings = self.rating_set.all()

        if ratings.count() == 0:
            average_rating = 0
        else:
            total_rating = sum(rating.rating for rating in ratings)
            average_rating = total_rating / ratings.count()

        serialized_ratings_list = [
            {
                "rating": str(rating.rating),
                "rating_description": rating.rating_description,
                "shoe": rating.shoe_id,
                "account": rating.account.username
            }
            for rating in ratings
        ]

        return {
            "ratings": serialized_ratings_list,
            "average_rating": average_rating
        }

    def __str__(self):
        return self.name or "Unknown Shoe"

    def get_api_url(self):
        return reverse("ShoeDetail", kwargs={"pk": self.pk})


class Rating(models.Model):
    rating_choices = [(Decimal(x)/2, Decimal(x)/2) for x in range(2, 11)]
    rating = models.DecimalField(max_digits=2, decimal_places=1, choices=rating_choices, null=True)
    rating_description = models.CharField(max_length=400, null=True)
    account = models.ForeignKey(
        AccountVO,
        on_delete=models.CASCADE,
        related_name="review_account",
        null=True
        )
    shoe = models.ForeignKey(
        Shoe,
        on_delete=models.CASCADE,
        related_name="rating_set",
        null=True
        )

    def __str__(self):
        return str(self.rating)

    # def get_api_url(self):
    #     return reverse("ShoeDetail", kwargs={"pk": self.pk})


class Favorite(models.Model):
    shoe = models.ForeignKey(
        Shoe,
        on_delete=models.CASCADE,
        related_name="shoe_set",
        null=True
        )
    account = models.ForeignKey(
        AccountVO,
        on_delete=models.CASCADE,
        related_name="favorites",
        null=True
        )

    class Meta:
        unique_together = ['shoe', 'account']

    def __str__(self):
        return str(self.shoe)

