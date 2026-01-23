from django.db import models


class Event(models.Model):
    EVENT_TYPES = [
        ("aarti", "Aarti"),
        ("festival", "Festival"),
        ("cultural", "Cultural"),
        ("market", "Market"),
        ("other", "Other"),
    ]

    title = models.CharField(max_length=140)
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField(null=True, blank=True)
    location_text = models.CharField(max_length=200)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    description = models.TextField()
    recurring = models.BooleanField(default=False)
    recurrence_rule = models.CharField(max_length=120, blank=True)
    event_type = models.CharField(max_length=20, choices=EVENT_TYPES, default="other")
    images = models.ManyToManyField("mediaapp.Photo", blank=True)
    ticket_link = models.URLField(blank=True)
    related_places = models.ManyToManyField("places.Place", blank=True)
    published_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["start_datetime"]

    def __str__(self) -> str:
        return self.title
