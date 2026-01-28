from django.contrib import admin
from .models import Article


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ("title", "author_name", "publish_date", "get_hero_image")
    search_fields = ("title", "summary", "body", "author_name")
    prepopulated_fields = {"slug": ("title",)}
    filter_horizontal = ("related_places", "tags")
    date_hierarchy = "publish_date"
    
    fieldsets = (
        ("Basic Information", {
            "fields": ("title", "slug", "author_name")
        }),
        ("Content", {
            "fields": ("summary", "body", "hero_image")
        }),
        ("Relations", {
            "fields": ("related_places", "tags")
        }),
        ("Publishing", {
            "fields": ("publish_date",)
        }),
        ("SEO", {
            "fields": ("seo_title", "seo_description"),
            "classes": ("collapse",)
        }),
    )
    
    def get_hero_image(self, obj):
        if obj.hero_image:
            return f"✓ {obj.hero_image.title}"
        return "No image"
    get_hero_image.short_description = "Hero Image"
