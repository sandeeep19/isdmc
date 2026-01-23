from rest_framework import viewsets, permissions
from .models import Contributor
from .serializers import ContributorSerializer


class ProfileViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Read-only profiles for public consumption.
    """

    queryset = Contributor.objects.select_related("user").all()
    serializer_class = ContributorSerializer
    permission_classes = [permissions.AllowAny]
