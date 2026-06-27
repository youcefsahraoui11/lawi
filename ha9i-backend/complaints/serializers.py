from rest_framework import serializers
from .models import Complaint

class ComplaintSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.email')

    class Meta:
        model = Complaint
        fields = '__all__'
        read_only_fields = ('user', 'status', 'submission_date')

    def validate(self, data):
        # Additional backend validation: ensure mobile phone is valid structure
        phone = data.get('mobile_phone', '')
        if phone and not phone.isdigit():
            raise serializers.ValidationError({"mobile_phone": "يجب أن يتكون رقم الهاتف من أرقام فقط."})
        return data
