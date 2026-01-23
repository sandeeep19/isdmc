from rest_framework import serializers
from .models import Place, Tag
from mediaapp.serializers import PhotoSerializer


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name"]


class PlaceSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    images = PhotoSerializer(many=True, read_only=True)

    class Meta:
        model = Place
        fields = "__all__"
