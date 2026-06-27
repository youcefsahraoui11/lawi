from rest_framework import serializers
from .models import Lawyer

class LawyerSerializer(serializers.ModelSerializer):
    specialization_display = serializers.CharField(source='get_specialization_display', read_only=True)

    class Meta:
        model = Lawyer
        fields = '__all__'
