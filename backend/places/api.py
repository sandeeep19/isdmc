from rest_framework import viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

from .models import Place
from .serializers import PlaceSerializer


class PlaceViewSet(viewsets.ModelViewSet):
    queryset = Place.objects.prefetch_related("tags", "images").all()
    serializer_class = PlaceSerializer
    lookup_field = "slug"
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["type", "neighbourhood", "tags__name", "featured"]
    search_fields = ["title", "short_description", "long_description"]
    ordering_fields = ["title", "published_at"]
