#raiz
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse

def home(request):
    return HttpResponse("Bienvenido a la API de Menú")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('menu_backend.menu.urls')),
    path('', home, name='home'),
]

# SOLO ESTO - NADA MÁS:
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    # NO AGREGUES static() para STATIC_URL aquí