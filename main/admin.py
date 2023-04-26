from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

# Register your models here.
from .models import Post, Like, Comment, Profile, Preference, Follow, Otp

admin.site.register(Post)
admin.site.register(Like)
admin.site.register(Profile)
admin.site.register(Comment)
admin.site.register(Follow)
admin.site.register(Otp)


class PreferenceInline(admin.StackedInline):
    model = Preference
    can_delete = False
    verbose_name_plural = "preference"

# Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines = [PreferenceInline]


# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
