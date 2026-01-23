from django.contrib import admin
from .models import Food


@admin.register(Food)
class FoodAdmin(admin.ModelAdmin):
    list_display = ("name", "dish_type", "published_at")
    list_filter = ("dish_type",)
    search_fields = ("name", "origin_story")
    prepopulated_fields = {"slug": ("name",)}
    filter_horizontal = ("where_to_eat", "images", "tags")
