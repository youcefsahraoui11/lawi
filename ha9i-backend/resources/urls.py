from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LegalResourceViewSet

router = DefaultRouter()
router.register(r'', LegalResourceViewSet, basename='resource')

urlpatterns = [
    path('', include(router.urls)),
]
