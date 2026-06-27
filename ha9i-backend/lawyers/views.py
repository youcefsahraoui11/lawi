from rest_framework import viewsets, permissions
from .models import Lawyer
from .serializers import LawyerSerializer

class LawyerViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = LawyerSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Lawyer.objects.all()
        wilaya = self.request.query_params.get('wilaya')
        specialization = self.request.query_params.get('specialization')

        if wilaya and wilaya != 'All':
            queryset = queryset.filter(wilaya__iexact=wilaya)
        if specialization and specialization != 'All':
            queryset = queryset.filter(specialization=specialization)

        return queryset
