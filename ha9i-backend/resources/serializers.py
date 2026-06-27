from rest_framework import serializers
from .models import LegalResource

class LegalResourceSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = LegalResource
        fields = '__all__'
