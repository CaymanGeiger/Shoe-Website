from django.db import models
from django.urls import reverse
from decimal import Decimal
from django.contrib.postgres.fields import ArrayField
from accounts_rest.models import Account


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
            "serialized_ratings": self.serialized_ratings,
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
                "account": rating.account.username,
            }
            for rating in ratings
        ]

        return {"ratings": serialized_ratings_list,
                "average_rating": average_rating
                }

    def __str__(self):
        return self.name or "Unknown Shoe"

    def get_api_url(self):
        return reverse("ShoeDetail", kwargs={"pk": self.pk})


class Rating(models.Model):
    rating_choices = [(Decimal(x) / 2, Decimal(x) / 2) for x in range(2, 11)]
    rating = models.DecimalField(
        max_digits=2, decimal_places=1, choices=rating_choices, null=True
    )
    rating_description = models.CharField(max_length=400, null=True)
    account = models.ForeignKey(
        Account, on_delete=models.CASCADE, related_name="review_account", null=True
    )
    shoe = models.ForeignKey(
        Shoe, on_delete=models.CASCADE, related_name="rating_set", null=True
    )

    def __str__(self):
        return str(self.rating)


class Favorite(models.Model):
    shoe = models.ForeignKey(
        Shoe, on_delete=models.CASCADE, related_name="shoe_set", null=True
    )
    account = models.ForeignKey(
        Account, on_delete=models.CASCADE, related_name="favorites", null=True
    )

    class Meta:
        unique_together = ["shoe", "account"]

    def __str__(self):
        return str(self.shoe)


class Cart(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    account = models.OneToOneField(
        Account, on_delete=models.CASCADE, related_name="account_cart"
    )

    def __str__(self):
        return str(self.account)

    @property
    def serialized_items(self):
        cart_id = self.id
        cart_items = self.cart_set.all()
        serialized_items_list = [
            {
                "item_id": item.id,
                "quantity": item.quantity,
                "shoe_id": item.shoe.id if item.shoe else None,
                "total_cost_item": item.get_cost(),
                "shoe": item.shoe.serialized_shoe if item.shoe else None,
            }
            for item in cart_items
        ]
        total_cost = sum(
            item["total_cost_item"] for item in serialized_items_list
        )
        return {"cart_id": cart_id, "total_cost": total_cost, "items": serialized_items_list}


class CartItem(models.Model):
    quantity = models.PositiveIntegerField(default=1)
    cart = models.ForeignKey(
        Cart, on_delete=models.CASCADE, related_name="cart_set"
        )
    shoe = models.ForeignKey(Shoe, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return str(self.shoe)

    def get_cost(self):
        return self.quantity * self.shoe.price
