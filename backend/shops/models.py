from django.db import models
from django.utils.text import slugify


class Shop(models.Model):
    name = models.CharField(max_length=140)
    slug = models.SlugField(unique=True, blank=True)
    product_types = models.JSONField(blank=True, null=True)
    owner_story = models.TextField(blank=True)
    address = models.CharField(max_length=200)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    opening_hours = models.JSONField(blank=True, null=True)
    best_products = models.TextField(blank=True)
    photos = models.ManyToManyField("mediaapp.Photo", blank=True)
    contact = models.JSONField(blank=True, null=True)
    tags = models.ManyToManyField("places.Tag", blank=True)
    seo_title = models.CharField(max_length=70, blank=True)
    seo_description = models.CharField(max_length=170, blank=True)
    published_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.name
