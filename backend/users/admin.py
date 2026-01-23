from django.contrib import admin

from .models import Contributor


@admin.register(Contributor)
class ContributorAdmin(admin.ModelAdmin):
    list_display = ("display_name", "user", "trust_score", "verified_badge")
    search_fields = ("display_name", "user__username")
