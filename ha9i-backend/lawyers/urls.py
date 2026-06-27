from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LawyerViewSet

router = DefaultRouter()
router.register(r'', LawyerViewSet, basename='lawyer')

urlpatterns = [
    path('', include(router.urls)),
]
