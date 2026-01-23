from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend

from .models import Article
from .serializers import ArticleSerializer


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.prefetch_related("related_places", "tags").select_related("hero_image").all()
    serializer_class = ArticleSerializer
    lookup_field = "slug"
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["tags__name"]
    search_fields = ["title", "summary", "body", "author_name"]
    ordering_fields = ["publish_date", "title"]
