from rest_framework import serializers
from .models import HiddenGem
from places.serializers import TagSerializer
from mediaapp.serializers import PhotoSerializer


class HiddenGemSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    images = PhotoSerializer(many=True, read_only=True)

    class Meta:
        model = HiddenGem
        fields = "__all__"
