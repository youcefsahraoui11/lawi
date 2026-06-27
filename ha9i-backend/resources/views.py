from rest_framework import viewsets, permissions
from django.db.models import Q
from .models import LegalResource
from .serializers import LegalResourceSerializer

class LegalResourceViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = LegalResourceSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = LegalResource.objects.all()
        category = self.request.query_params.get('category')
        search = self.request.query_params.get('search')

        if category and category != 'All':
            queryset = queryset.filter(category=category)
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | Q(summary__icontains=search)
            )

        return queryset
