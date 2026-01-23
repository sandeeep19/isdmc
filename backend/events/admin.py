from django.contrib import admin
from .models import Event


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("title", "event_type", "start_datetime", "recurring")
    list_filter = ("event_type", "recurring")
    search_fields = ("title", "description", "location_text")
    filter_horizontal = ("images", "related_places")
