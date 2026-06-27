from django.db import models

class LegalResource(models.Model):
    CATEGORY_CHOICES = (
        ('civil', 'Civil Law (القانون المدني)'),
        ('criminal', 'Criminal Law (قانون العقوبات)'),
        ('family', 'Family Law (قانون الأسرة)'),
        ('admin', 'Administrative Law (القانون الإداري)'),
        ('labor', 'Labor Law (قانون العمل)'),
        ('constitution', 'Constitution (الدستور)'),
        ('official', 'Official Gazette (الجريدة الرسمية)'),
    )

    title = models.CharField(max_length=250)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default='civil')
    published_date = models.DateField(null=True, blank=True)
    summary = models.TextField()
    
    # URL pointing to PDF file storage
    pdf_url = models.URLField(max_length=500, blank=True)

    def __str__(self):
        return f"{self.title} ({self.category})"
