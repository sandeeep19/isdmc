"""
WSGI config for Indian Studio DMC.
"""
import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "indian_studio_dmc.settings")

application = get_wsgi_application()
