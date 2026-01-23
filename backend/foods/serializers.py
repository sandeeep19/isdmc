from rest_framework import serializers
from .models import Food
from places.serializers import TagSerializer
from mediaapp.serializers import PhotoSerializer
from places.serializers import PlaceSerializer


class FoodSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    images = PhotoSerializer(many=True, read_only=True)
    where_to_eat = PlaceSerializer(many=True, read_only=True)

    class Meta:
        model = Food
        fields = "__all__"
