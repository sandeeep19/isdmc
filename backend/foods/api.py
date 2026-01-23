from rest_framework import viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

from .models import Food
from .serializers import FoodSerializer


class FoodViewSet(viewsets.ModelViewSet):
    queryset = Food.objects.prefetch_related("tags", "images", "where_to_eat").all()
    serializer_class = FoodSerializer
    lookup_field = "slug"
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["dish_type", "tags__name"]
    search_fields = ["name", "origin_story"]
    ordering_fields = ["name", "published_at"]
