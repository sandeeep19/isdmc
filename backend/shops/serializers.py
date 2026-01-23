from rest_framework import serializers
from .models import Shop
from mediaapp.serializers import PhotoSerializer
from places.serializers import TagSerializer


class ShopSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    photos = PhotoSerializer(many=True, read_only=True)

    class Meta:
        model = Shop
        fields = "__all__"
