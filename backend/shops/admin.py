from django.contrib import admin
from .models import Shop


@admin.register(Shop)
class ShopAdmin(admin.ModelAdmin):
    list_display = ("name", "published_at")
    search_fields = ("name", "owner_story", "address")
    prepopulated_fields = {"slug": ("name",)}
    filter_horizontal = ("photos", "tags")
