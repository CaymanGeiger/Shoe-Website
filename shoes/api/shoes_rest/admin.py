from django.contrib import admin
from .models import Shoe, Rating, Favorite

# Register your models here.


@admin.register(Shoe)
class ShoeAdmin(admin.ModelAdmin):
    pass


@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    pass


@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    pass
