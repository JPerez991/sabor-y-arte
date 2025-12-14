"""
Django settings for menu_backend project.
"""

import os
import dj_database_url
from pathlib import Path

# Build paths
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-jkodbu2a^jg-te8c=ira-c^42@93w!n4^n=d!fj7_ob1gyarrb')

# SECURITY WARNING: don't run with debug turned on in production!
# ✅ CORREGIDO: DEBUG debe ser True temporalmente para diagnosticar
DEBUG = os.environ.get('DEBUG', 'True') == 'True'

# ✅ CORREGIDO: Añadir hosts manualmente desde el inicio
ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    '.onrender.com',  # Permite cualquier subdominio de Render
]

# Application definition
# ✅ CORREGIDO: Comas añadidas y orden corregido
INSTALLED_APPS = [
    'admin_interface',
    'colorfield',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'menu_backend.menu',  # Tu app
    # 'jet',  # ⚠️ COMENTA JET TEMPORALMENTE - puede causar conflictos
]

# ✅ CORREGIDO: Añade esto para admin_interface
X_FRAME_OPTIONS = "SAMEORIGIN"
SILENCED_SYSTEM_CHECKS = ["security.W019"]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # CORS debe estar aquí
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'menu_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],  # ✅ Añade directorio templates
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                # ✅ CORREGIDO: Añade todos los context processors necesarios
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'menu_backend.wsgi.application'

# Database
DATABASES = {
    'default': dj_database_url.config(
        default='sqlite:///' + os.path.join(BASE_DIR, 'db.sqlite3'),
        conn_max_age=600
    )
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Internationalization
LANGUAGE_CODE = 'es-es'
TIME_ZONE = 'America/Bogota'
USE_I18N = True
USE_TZ = True

# Static files
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# ✅ Añade esto para WhiteNoise
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Admin customization
ADMIN_SITE_HEADER = "🍽️ QuickMenu Admin"
ADMIN_SITE_TITLE = "Panel de Control del Restaurante"
ADMIN_INDEX_TITLE = "Gestión del Menú Digital"

# CORS Configuration
CORS_ALLOWED_ORIGINS = [
    "https://sabor-y-arte.onrender.com",
    "https://sabor-y-arte-frontend.vercel.app",
    "http://localhost:3000",
    "http://localhost:8000",
]
CORS_ALLOW_CREDENTIALS = True

# Para desarrollo, permite todos los orígenes
if DEBUG:
    CORS_ALLOW_ALL_ORIGINS = True

# REST Framework
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',  # ✅ Añade esto para ver API en navegador
    ]
}

# Render production settings
if 'RENDER' in os.environ:
    # ✅ Asegura que DEBUG sea False en producción
    DEBUG = False
    
    # Security settings - ⚠️ COMENTA TEMPORALMENTE para diagnosticar
    # SECURE_HSTS_SECONDS = 31536000
    # SECURE_SSL_REDIRECT = True
    # SESSION_COOKIE_SECURE = True
    # CSRF_COOKIE_SECURE = True
    # SECURE_BROWSER_XSS_FILTER = True
    # SECURE_CONTENT_TYPE_NOSNIFF = True
    
    # Allowed hosts
    RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
    if RENDER_EXTERNAL_HOSTNAME:
        ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)
    
    # ✅ Añade el host específico de tu app
    ALLOWED_HOSTS.append('sabor-y-arte.onrender.com')
    
    # ✅ Desactiva CORS_ALLOW_ALL_ORIGINS en producción
    CORS_ALLOW_ALL_ORIGINS = False

# ✅ Añade configuración de logging para ver errores
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'WARNING',
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': os.getenv('DJANGO_LOG_LEVEL', 'INFO'),
            'propagate': False,
        },
    },
}