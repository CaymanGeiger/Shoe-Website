from django.urls import path
from .views import (
    accountList,
    accountDetail,
    accountLogIn,
    get_csrf_token,
    CheckAuthStatusView,
    accountLogOut,
)

urlpatterns = [
    path("accounts/", accountList, name="accountList"),
    path("account/<int:pk>/", accountDetail, name="accountDetail"),
    path("account/login/", accountLogIn, name="accountLogIn"),
    path("account/logout/", accountLogOut, name="accountLogOut"),
    path("csrf-token/", get_csrf_token, name="get_csrf_token"),
    path('check-auth-status/', CheckAuthStatusView.as_view(), name='check-auth-status'),
]
