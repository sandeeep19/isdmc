from django.contrib import admin
from .models import Place, Tag


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    search_fields = ("name",)


@admin.register(Place)
class PlaceAdmin(admin.ModelAdmin):
    list_display = ("title", "type", "neighbourhood", "featured", "published_at", "crowd_level")
    list_filter = ("type", "featured", "neighbourhood", "is_wheelchair_accessible", "is_elderly_friendly")
    search_fields = ("title", "neighbourhood", "short_description", "long_description")
    prepopulated_fields = {"slug": ("title",)}
    filter_horizontal = ("tags", "images")
    list_editable = ("featured",)
    date_hierarchy = "published_at"
    actions = ["make_featured", "make_unfeatured", "publish_now"]
    
    fieldsets = (
        ("Basic Information", {
            "fields": ("title", "slug", "type", "address", "neighbourhood")
        }),
        ("Location", {
            "fields": ("latitude", "longitude"),
            "classes": ("collapse",)
        }),
        ("Content", {
            "fields": ("short_description", "long_description", "history_story", "visitor_tips")
        }),
        ("Details", {
            "fields": ("open_hours", "entry_fee", "best_time_to_visit", "crowd_level")
        }),
        ("Accessibility", {
            "fields": ("is_wheelchair_accessible", "is_elderly_friendly")
        }),
        ("Media & Tags", {
            "fields": ("images", "tags")
        }),
        ("Publishing", {
            "fields": ("featured", "published_at")
        }),
        ("SEO", {
            "fields": ("seo_title", "seo_description", "schema_type"),
            "classes": ("collapse",)
        }),
    )
    
    def make_featured(self, request, queryset):
        queryset.update(featured=True)
    make_featured.short_description = "Mark selected as featured"
    
    def make_unfeatured(self, request, queryset):
        queryset.update(featured=False)
    make_unfeatured.short_description = "Remove featured status"
    
    def publish_now(self, request, queryset):
        from django.utils import timezone
        queryset.update(published_at=timezone.now())
    publish_now.short_description = "Publish selected items now"
