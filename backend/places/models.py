from django.db import models
from django.utils.text import slugify


class Tag(models.Model):
    name = models.CharField(max_length=60, unique=True)

    def __str__(self) -> str:
        return self.name


class Place(models.Model):
    PLACE_TYPES = [
        ("ghat", "Ghat"),
        ("temple", "Temple"),
        ("shop", "Shop"),
        ("alley", "Alley"),
        ("museum", "Museum"),
        ("other", "Other"),
    ]

    title = models.CharField(max_length=120)
    slug = models.SlugField(unique=True, blank=True)
    type = models.CharField(max_length=20, choices=PLACE_TYPES)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    address = models.CharField(max_length=200)
    neighbourhood = models.CharField(max_length=80)
    short_description = models.CharField(max_length=160)
    long_description = models.TextField(blank=True)
    history_story = models.TextField(blank=True)
    open_hours = models.JSONField(blank=True, null=True)
    entry_fee = models.CharField(max_length=60, blank=True)
    best_time_to_visit = models.CharField(max_length=80, blank=True)
    visitor_tips = models.TextField(blank=True)
    tags = models.ManyToManyField(Tag, blank=True)
    images = models.ManyToManyField("mediaapp.Photo", blank=True)
    featured = models.BooleanField(default=False)
    schema_type = models.CharField(max_length=40, default="Place")
    seo_title = models.CharField(max_length=70, blank=True)
    seo_description = models.CharField(max_length=170, blank=True)
    is_wheelchair_accessible = models.BooleanField(default=False)
    is_elderly_friendly = models.BooleanField(default=False)
    crowd_level = models.PositiveSmallIntegerField(default=3, help_text="1: Quiet, 5: Very Busy")
    published_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["title"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.title
