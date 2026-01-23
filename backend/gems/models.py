from django.db import models
from django.utils.text import slugify


class HiddenGem(models.Model):
    CATEGORY_CHOICES = [
        ("place", "Place"),
        ("food", "Food"),
        ("story", "Story"),
        ("photo", "Photo"),
    ]
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    ]

    title = models.CharField(max_length=140)
    slug = models.SlugField(unique=True, blank=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    description = models.TextField()
    how_to_find = models.TextField()
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    difficulty_accessibility = models.CharField(max_length=60, blank=True)
    tags = models.ManyToManyField("places.Tag", blank=True)
    images = models.ManyToManyField("mediaapp.Photo", blank=True)
    contributor_name = models.CharField(max_length=120)
    contributor_profile = models.URLField(blank=True)
    verification_status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    moderator_notes = models.TextField(blank=True)
    is_wheelchair_accessible = models.BooleanField(default=False)
    is_elderly_friendly = models.BooleanField(default=False)
    crowd_level = models.PositiveSmallIntegerField(default=3, help_text="1: Quiet, 5: Very Busy")
    published_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.title
