from django.contrib import admin
from .models import HiddenGem


@admin.register(HiddenGem)
class HiddenGemAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "verification_status", "created_at")
    list_filter = ("verification_status", "category")
    search_fields = ("title", "description", "how_to_find", "contributor_name")
    prepopulated_fields = {"slug": ("title",)}
    filter_horizontal = ("tags", "images")
