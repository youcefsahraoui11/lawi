from django.db import models
from django.conf import settings

class Complaint(models.Model):
    NATURE_CHOICES = (
        ('person', 'Natural Person (شخص طبيعي)'),
        ('moral', 'Legal Entity (شخص معنوي)'),
    )
    GENDER_CHOICES = (
        ('male', 'Male (ذكر)'),
        ('female', 'Female (أنثى)'),
    )
    STATUS_CHOICES = (
        ('submitted', 'Submitted (تم الإيداع)'),
        ('under_verification', 'Under Verification (قيد التحقق)'),
        ('under_review', 'Under Review (قيد الدراسة)'),
        ('accepted', 'Accepted (مقبولة)'),
        ('contact_citizen', 'Contact Citizen (الاتصال بالمواطن)'),
        ('rejected', 'Rejected (مرفوضة)'),
    )

    # Citizen relation
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='complaints')
    
    # 1. Complainant Information
    complainant_nature = models.CharField(max_length=10, choices=NATURE_CHOICES, default='person')
    last_name = models.CharField(max_length=100, verbose_name="Last name Arabic")
    last_name_latin = models.CharField(max_length=100, verbose_name="Last name Latin")
    first_name = models.CharField(max_length=100, verbose_name="First name Arabic")
    first_name_latin = models.CharField(max_length=100, verbose_name="First name Latin")
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default='male')

    # 2. Birth Information
    birth_date = models.DateField(null=True, blank=True)
    birth_country = models.CharField(max_length=100, default="Algeria")
    birth_wilaya = models.CharField(max_length=100)
    birth_commune = models.CharField(max_length=100)
    birth_certificate_number = models.CharField(max_length=50)

    # 3. Family Information
    father_name = models.CharField(max_length=200, blank=True)
    mother_name = models.CharField(max_length=200, blank=True)

    # 4. National Identification
    national_id = models.CharField(max_length=18)

    # 5. Identity Document details
    doc_type = models.CharField(max_length=100, default="National ID Card")
    doc_number = models.CharField(max_length=50)
    doc_issue_date = models.DateField(null=True, blank=True)
    doc_issued_by = models.CharField(max_length=100, blank=True)

    # 6. Residence Information
    residence_address = models.TextField()
    residence_wilaya = models.CharField(max_length=100)
    residence_commune = models.CharField(max_length=100)

    # 7. Contact Information
    mobile_phone = models.CharField(max_length=20)
    email = models.EmailField()

    # Track Metadata
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='submitted')
    submission_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Complaint {self.id} by {self.first_name} {self.last_name} (Status: {self.status})"
