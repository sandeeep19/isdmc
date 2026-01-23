from rest_framework import serializers
from .models import Article
from mediaapp.serializers import PhotoSerializer
from places.serializers import PlaceSerializer, TagSerializer


class ArticleSerializer(serializers.ModelSerializer):
    hero_image = PhotoSerializer(read_only=True)
    related_places = PlaceSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Article
        fields = "__all__"
