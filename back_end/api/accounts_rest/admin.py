from django.contrib import admin
from .models import Account


class AccountsAdmin(admin.ModelAdmin):
    search_fields = ['username', 'email', 'first_name', 'last_name']


admin.site.register(Account, AccountsAdmin)
