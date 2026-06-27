from django.contrib import admin
from django.http import JsonResponse
from django.urls import path, include


def api_root(request):
    return JsonResponse({
        'message': 'HA9I API is running',
        'auth': '/api/v1/auth/',
        'complaints': '/api/v1/complaints/',
        'lawyers': '/api/v1/lawyers/',
        'resources': '/api/v1/resources/',
        'chat': '/api/v1/chat/',
    })


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', api_root, name='api_root'),
    path('api/v1/auth/', include('authentication.urls')),
    path('api/v1/complaints/', include('complaints.urls')),
    path('api/v1/lawyers/', include('lawyers.urls')),
    path('api/v1/resources/', include('resources.urls')),
    path('api/v1/chat/', include('chat.urls')),
]
