from django.conf import settings
from django.db import models


class Contributor(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="contributor_profile")
    display_name = models.CharField(max_length=80)
    bio = models.TextField(blank=True)
    avatar = models.URLField(blank=True)
    social_links = models.JSONField(blank=True, null=True)
    trust_score = models.IntegerField(default=0)
    verified_badge = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.display_name or self.user.username
