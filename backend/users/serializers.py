from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Contributor


User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name"]


class ContributorSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Contributor
        fields = [
            "id",
            "user",
            "display_name",
            "bio",
            "avatar",
            "social_links",
            "trust_score",
            "verified_badge",
        ]
