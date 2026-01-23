from django.db import models
from django.utils.text import slugify


class Food(models.Model):
    DISH_TYPES = [
        ("breakfast", "Breakfast"),
        ("snack", "Snack"),
        ("sweet", "Sweet"),
        ("drink", "Drink"),
        ("meal", "Meal"),
    ]

    name = models.CharField(max_length=120)
    slug = models.SlugField(unique=True, blank=True)
    dish_type = models.CharField(max_length=20, choices=DISH_TYPES)
    origin_story = models.TextField(blank=True)
    is_wheelchair_accessible = models.BooleanField(default=False)
    is_elderly_friendly = models.BooleanField(default=False)
    crowd_level = models.PositiveSmallIntegerField(default=3, help_text="1: Quiet, 5: Very Busy")
    where_to_eat = models.ManyToManyField("places.Place", blank=True)
    spice_level = models.CharField(max_length=20, blank=True)
    best_time = models.CharField(max_length=80, blank=True)
    recommended_stalls = models.JSONField(blank=True, null=True)
    images = models.ManyToManyField("mediaapp.Photo", blank=True)
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
