"""
WSGI config for back_end project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os
import sys

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "back_end.settings")

application = get_wsgi_application()
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
