from django.contrib import admin
from .models import Place, Tag


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    search_fields = ("name",)


@admin.register(Place)
class PlaceAdmin(admin.ModelAdmin):
    list_display = ("title", "type", "neighbourhood", "featured")
    list_filter = ("type", "featured", "neighbourhood")
    search_fields = ("title", "neighbourhood", "short_description")
    prepopulated_fields = {"slug": ("title",)}
    filter_horizontal = ("tags", "images")
