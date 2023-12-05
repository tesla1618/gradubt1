from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User
# Register your models here.


class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ['username', 'email', 'first_name',
                    'last_name', 'is_staff', 'is_active', 'created_at']


admin.site.register(User, CustomUserAdmin)