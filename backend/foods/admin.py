from django.contrib import admin
from .models import Food


@admin.register(Food)
class FoodAdmin(admin.ModelAdmin):
    list_display = ("name", "dish_type", "spice_level", "best_time", "published_at")
    list_filter = ("dish_type", "spice_level")
    search_fields = ("name", "origin_story")
    prepopulated_fields = {"slug": ("name",)}
    filter_horizontal = ("where_to_eat", "images", "tags")
    list_editable = ("dish_type",)
    date_hierarchy = "published_at"
    actions = ["publish_now"]
    
    fieldsets = (
        ("Basic Information", {
            "fields": ("name", "slug", "dish_type")
        }),
        ("Story & Details", {
            "fields": ("origin_story", "spice_level", "best_time")
        }),
        ("Locations", {
            "fields": ("where_to_eat", "recommended_stalls")
        }),
        ("Accessibility", {
            "fields": ("is_wheelchair_accessible", "is_elderly_friendly", "crowd_level")
        }),
        ("Media & Tags", {
            "fields": ("images", "tags")
        }),
        ("Publishing", {
            "fields": ("published_at",)
        }),
        ("SEO", {
            "fields": ("seo_title", "seo_description"),
            "classes": ("collapse",)
        }),
    )
    
    def publish_now(self, request, queryset):
        from django.utils import timezone
        queryset.update(published_at=timezone.now())
    publish_now.short_description = "Publish selected items now"
