from django.db import models

class Lawyer(models.Model):
    SPECIALIZATION_CHOICES = (
        ('civil', 'Civil Law (القانون المدني)'),
        ('criminal', 'Criminal Law (قانون العقوبات)'),
        ('family', 'Family Law (قانون الأسرة)'),
        ('labor', 'Labor Law (قانون العمل)'),
        ('admin', 'Administrative Law (القانون الإداري)'),
    )

    name = models.CharField(max_length=200)
    specialization = models.CharField(max_length=30, choices=SPECIALIZATION_CHOICES, default='civil')
    wilaya = models.CharField(max_length=100, db_index=True)
    address = models.TextField()
    phone = models.CharField(max_length=20)
    
    # Coordinates for Map View (OpenStreetMap pins)
    latitude = models.FloatField(default=36.7538)
    longitude = models.FloatField(default=3.0612)

    def __str__(self):
        return f"{self.name} - {self.specialization} ({self.wilaya})"
