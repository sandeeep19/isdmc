from django.contrib import admin
from .models import Photo


@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ("title", "photographer", "created_at")
    search_fields = ("title", "photographer")
