from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Complaint
from .serializers import ComplaintSerializer

class ComplaintViewSet(viewsets.ModelViewSet):
    serializer_class = ComplaintSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Citizens only see their own submitted complaints
        # Admin staff can inspect all submissions
        user = self.request.user
        if user.is_staff:
            return Complaint.objects.all().order_by('-submission_date')
        return Complaint.objects.filter(user=user).order_by('-submission_date')

    def perform_create(self, serializer):
        # Automatically assign the request user (Citizen)
        # Sets initial status to under_verification
        serializer.save(user=self.request.user, status='under_verification')

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAdminUser])
    def update_status(self, request, pk=None):
        """
        Custom endpoint for Ministry of Justice officers to transition a complaint status
        Usage: POST /api/v1/complaints/{id}/update_status/ with body {"status": "under_review"}
        """
        complaint = self.get_object()
        new_status = request.data.get('status')
        valid_statuses = [choice[0] for choice in Complaint.STATUS_CHOICES]
        
        if new_status not in valid_statuses:
            return Response(
                {"error": f"حالة غير صالحة. الحالات المقبولة هي: {', '.join(valid_statuses)}"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        complaint.status = new_status
        complaint.save()
        return Response(ComplaintSerializer(complaint).data)
