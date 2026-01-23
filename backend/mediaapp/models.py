from django.db import models


class Photo(models.Model):
    title = models.CharField(max_length=120)
    location_text = models.CharField(max_length=200, blank=True)
    photographer = models.CharField(max_length=120, blank=True)
    copyright = models.CharField(max_length=120, blank=True)
    tags = models.JSONField(blank=True, null=True)
    image_file = models.URLField()
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.title
