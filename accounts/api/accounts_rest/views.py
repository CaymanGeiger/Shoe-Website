from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Account
from common.json import ModelEncoder
from django.contrib.auth import authenticate, login, logout
import json
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.utils.decorators import method_decorator
from django.middleware.csrf import get_token
from django.views import View
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import make_password




class AccountEncoder(ModelEncoder):
    model = Account
    properties = [
        "id",
        "username",
        "first_name",
        "last_name",
        "date_joined",
        "is_active",
        "email",
        "user_level",
        "profile_picture",
    ]


def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})


class CheckAuthStatusView(View):
    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        user_id = request.user.id if request.user.is_authenticated else None
        is_active = request.user.is_active if request.user.is_authenticated else None
        user_first_name = request.user.first_name if request.user.is_authenticated else None
        return JsonResponse({
            'isAuthenticated': request.user.is_authenticated,
            "id": user_id,
            "first_name": user_first_name,
            "is_active": is_active
        })


def accountLogOut(request):
    print("Logout endpoint hit")
    logout(request)
    print("After logout")
    return JsonResponse({'message': 'User Logged Out'})


@csrf_protect
@require_http_methods(["POST"])
def accountLogIn(request):
    if request.method == "POST":
        content = json.loads(request.body)
        username = content.get('username')
        password = content.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'User logged in successfully'})
        else:
            return JsonResponse({'error': 'Invalid username or password'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=400)


@require_http_methods(["GET", "POST"])
def accountList(request):
    if request.method == "GET":
        accounts = Account.objects.all()
        return JsonResponse(
            {"accounts": accounts},
            encoder=AccountEncoder,
            safe=False
            )
    elif request.method == "POST":
        content = json.loads(request.body)
        username = content.get('username')
        password = content.get('password')
        email = content.get('email')
        first_name = content.get('first_name')
        last_name = content.get('last_name')

        try:
            user = Account.objects.create_user(
                username=username,
                email=email,
                password=password,
                first_name=first_name,
                last_name=last_name
            )

            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({'message': 'User created and logged in successfully'})
            else:
                return JsonResponse({'error': 'Authentication failed after user creation'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=400)




@require_http_methods(["GET", "DELETE"])
def accountDetail(request, pk):
    if request.method == "GET":
        account = Account.objects.get(id=pk)
        return JsonResponse(
            account,
            encoder=AccountEncoder,
            safe=False,
        )
    else:
        count, _ = Account.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
