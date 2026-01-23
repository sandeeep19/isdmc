from django.db import models
from django.utils.text import slugify


class Article(models.Model):
    title = models.CharField(max_length=160)
    slug = models.SlugField(unique=True, blank=True)
    hero_image = models.ForeignKey("mediaapp.Photo", on_delete=models.SET_NULL, null=True, blank=True)
    summary = models.CharField(max_length=200)
    body = models.TextField()
    author_name = models.CharField(max_length=120)
    related_places = models.ManyToManyField("places.Place", blank=True)
    tags = models.ManyToManyField("places.Tag", blank=True)
    seo_title = models.CharField(max_length=70, blank=True)
    seo_description = models.CharField(max_length=170, blank=True)
    publish_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-publish_date"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.title
