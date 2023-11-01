from django.urls import path
from .views import (
    ShoeList,
    ShoeDetail,
    RatingList,
    FavoriteList,
    FavoriteDelete,
    RatingDelete
)

urlpatterns = [
    path("shoes/", ShoeList, name="ShoeList"),
    path("bin/<int:bin_vo_id>/shoes/", ShoeList, name="ShoeListPerBin"),
    path("shoe/<int:pk>/", ShoeDetail, name="ShoeDetail"),
    path("ratings/<int:shoe_id>/<int:user_id>/", RatingList, name="RatingList"),
    path("ratings/<int:shoe_id>/", RatingList, name="RatingList"),
    path('rating/<int:rating_id>/', RatingDelete, name='RatingDelete'),
    path('favorites/<int:user_id>/', FavoriteList, name='FavoriteList'),
    path('favorites/<int:shoe_id>/<int:user_id>/', FavoriteList, name='FavoriteList'),
    path('favorite/<int:favorite_id>/', FavoriteDelete, name='FavoriteDelete'),
]
