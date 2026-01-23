from rest_framework import serializers
from .models import Event
from mediaapp.serializers import PhotoSerializer
from places.serializers import PlaceSerializer


class EventSerializer(serializers.ModelSerializer):
    images = PhotoSerializer(many=True, read_only=True)
    related_places = PlaceSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = "__all__"
