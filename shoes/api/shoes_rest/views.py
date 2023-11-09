from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Shoe, Rating, AccountVO, Favorite, Cart, CartItem
from common.json import ModelEncoder
import json
from django.db.models import F


class AccountEncoder(ModelEncoder):
    model = AccountVO
    properties = ["id"]


class RatingEncoder(ModelEncoder):
    model = Rating
    properties = [
        "rating",
        "rating_description",
        "id",
    ]


class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "name",
        "id",
        "brand",
        "price",
        "sizes",
        "color",
        "picture_url",
        "description",
        "serialized_ratings",
    ]


class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "name",
        "id",
        "brand",
        "price",
        "sizes",
        "color",
        "picture_url",
        "description",
        "serialized_ratings",
    ]


class CartEncoder(ModelEncoder):
    model = Cart
    properties = [
        "id",
    ]


class CartItemsEncoder(ModelEncoder):
    model = CartItem
    properties = [
        "quantity",
        "cart",
        "shoe",
    ]
    encoders = {
        "shoe": ShoeListEncoder(),
        "cart": CartEncoder(),
    }


class FavoriteEncoder(ModelEncoder):
    model = Favorite
    properties = [
        "shoe",
        "account",
        "id",
    ]
    encoders = {
        "shoe": ShoeListEncoder(),
        "account": AccountEncoder(),
    }


@require_http_methods(["GET", "POST"])
def ShoeList(request, bin_vo_id=None):
    if request.method == "GET":
        if bin_vo_id is not None:
            shoes = Shoe.objects.filter(bin=bin_vo_id)
        else:
            shoes = Shoe.objects.all()
        return JsonResponse({"shoes": shoes}, encoder=ShoeListEncoder, safe=False)
    else:
        content = json.loads(request.body)
        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE"])
def ShoeDetail(request, pk):
    if request.method == "GET":
        shoe = Shoe.objects.get(id=pk)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )
    else:
        count, _ = Shoe.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def RatingList(request, shoe_id=None, user_id=None):
    if request.method == "GET":
        if user_id is not None:
            ratings = Rating.objects.filter(shoe=user_id)
        else:
            ratings = Rating.objects.filter(shoe=shoe_id)
        return JsonResponse(
            {"ratings": ratings},
            encoder=RatingEncoder,
            safe=False
            )
    else:
        content = json.loads(request.body)
        try:
            shoeID = f"{shoe_id}"
            shoe = Shoe.objects.get(id=shoeID)
            content["shoe"] = shoe
        except Rating.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid shoe id"},
                status=400,
            )
        try:
            accountID = f"{user_id}"
            account = AccountVO.objects.get(id=accountID)
            content["account"] = account
        except AccountVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid account id"},
                status=400,
            )
        rating = Rating.objects.create(**content)
        return JsonResponse(
            rating,
            encoder=RatingEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def RatingDelete(request, rating_id=None):
    if request.method == "DELETE":
        if rating_id is None:
            return JsonResponse({"message": "Rating id is required"}, status=400)
        try:
            Rating.objects.get(id=rating_id)
        except Rating.DoesNotExist:
            return JsonResponse({"message": "Rating not found"}, status=404)
        count, _ = Rating.objects.filter(id=rating_id).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def FavoriteList(request, user_id=None, shoe_id=None):
    if request.method == "GET":
        if user_id is None:
            return JsonResponse({"message": "User id is required"}, status=400)
        try:
            user = AccountVO.objects.get(id=user_id)
        except AccountVO.DoesNotExist:
            return JsonResponse({"message": "User not found"}, status=404)
        favorites = user.serialized_favorites
        return JsonResponse({"favorites": favorites}, safe=False)
    else:
        content = {}
        try:
            userID = f"{user_id}"
            user = AccountVO.objects.get(id=userID)
            content["account"] = user
        except AccountVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid user id"},
                status=400,
            )
        try:
            shoeID = f"{shoe_id}"
            shoe = Shoe.objects.get(id=shoeID)
            content["shoe"] = shoe
        except Shoe.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid shoe id"},
                status=400,
            )
        existing_favorite = Favorite.objects.filter(account=user, shoe=shoe).first()
        if existing_favorite:
            return JsonResponse(
                {"message": "Shoe already in favorites!"},
                status=400
            )
        favorite = Favorite.objects.create(**content)
        serialized_favorite = FavoriteEncoder().default(favorite)
        return JsonResponse(
            serialized_favorite,
            safe=False
        )



@require_http_methods(["DELETE"])
def FavoriteDelete(request, favorite_id=None):
    if request.method == "DELETE":
        if favorite_id is None:
            return JsonResponse({"message": "Favorite id is required"}, status=400)
        try:
            Favorite.objects.get(id=favorite_id)
        except Favorite.DoesNotExist:
            return JsonResponse({"message": "Favorite not found"}, status=404)
        count, _ = Favorite.objects.filter(id=favorite_id).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def CartList(request, user_id=None, shoe_id=None, cart_id=None, quantity=1):
    if request.method == "GET":
        if shoe_id is not None:
            pass
        if user_id is None:
            return JsonResponse({"message": "User id is required"}, status=400)
        try:
            user = Cart.objects.get(account=user_id)
        except Cart.DoesNotExist:
            return JsonResponse({"message": "User not found"}, status=404)
        cart_items = user.serialized_items
        return JsonResponse(cart_items, safe=False)
    else:
        try:
            shoe = Shoe.objects.get(id=shoe_id)
            cart = Cart.objects.get(id=cart_id)
            cart_item = CartItem.objects.filter(shoe=shoe, cart=cart).first()

            if cart_item:
                cart_item.quantity = F('quantity') + quantity
                cart_item.save()
                cart_item.refresh_from_db()
                return JsonResponse(
                    cart_item,
                    CartItemsEncoder,
                    safe=False
                    )
        except Shoe.DoesNotExist:
            return JsonResponse({"message": "Invalid shoe id"}, status=400)
        except Cart.DoesNotExist:
            return JsonResponse({"message": "Invalid cart id"}, status=400)

        content = {}
        try:
            shoeID = f"{shoe_id}"
            shoe = Shoe.objects.get(id=shoeID)
            content["shoe"] = shoe
        except Shoe.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid shoe id"},
                status=400,
            )
        try:
            cartID = f"{cart_id}"
            cart = Cart.objects.get(id=cartID)
            content["cart"] = cart
        except Cart.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid cart id"},
                status=400,
            )
        quantity_amount = f"{quantity}"
        content["quantity"] = quantity_amount
        cart_item = CartItem.objects.create(**content)
        return JsonResponse(
            cart_item,
            CartItemsEncoder,
            safe=False
        )


@require_http_methods(["DELETE"])
def CartItemDelete(request, cart_item_id=None, cart_id=None):
    if request.method == "DELETE":
        if cart_id is None:
            return JsonResponse({"message": "Cart id is required"}, status=400)
        try:
            Cart.objects.get(id=cart_id)
        except CartItem.DoesNotExist:
            return JsonResponse({"message": "Cart not found"}, status=404)
        count, _ = CartItem.objects.filter(id=cart_item_id).delete()
        return JsonResponse({"deleted": count > 0})
