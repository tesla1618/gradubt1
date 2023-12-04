from django.contrib import admin
from .models import *
from unfold.admin import ModelAdmin
from django.contrib.auth.admin import UserAdmin


class CustomUserAdmin(ModelAdmin):
    list_display = ('email', 'name', 'dept', 'is_student', 'is_teacher')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name', 'dept', 'is_student', 'is_teacher')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', )}),
    )

# @admin.register(UserAccount)


# @admin.register(Student)
# @admin.register(EventImage)
# @admin.register(Userprofile)
# @admin.register(EventSpeaker)
# @admin.register(RegisteredEvent)
# @admin.register(InterestedEvent)
# @admin.register(UserAccount)
@admin.register(Course)
@admin.register(Result)
@admin.register(Student)
@admin.register(Teacher)
class CustomAdminClass(ModelAdmin):
    pass

# admin.site.unregister(UserAccount) 



admin.site.register(UserAccount, CustomUserAdmin)
# admin.site.register(Student, CustomAdminClass)
# admin.site.register(UserAccount, CustomAdminClass)


admin.site.register(Group)