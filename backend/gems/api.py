from rest_framework import viewsets, permissions, filters, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend

from .models import HiddenGem
from .serializers import HiddenGemSerializer


class HiddenGemViewSet(viewsets.ModelViewSet):
    queryset = HiddenGem.objects.prefetch_related("tags", "images").all()
    serializer_class = HiddenGemSerializer
    lookup_field = "slug"
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["category", "verification_status", "tags__name"]
    search_fields = ["title", "description", "how_to_find", "contributor_name"]
    ordering_fields = ["created_at", "published_at"]


class HiddenGemSubmissionView(APIView):
    """
    Public submission endpoint for hidden gems.
    """

    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        data["verification_status"] = "pending"
        serializer = HiddenGemSerializer(data=data)
        if serializer.is_valid():
            gem = serializer.save()
            output = HiddenGemSerializer(gem).data
            return Response(output, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
