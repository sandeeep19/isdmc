#!/bin/sh
set -e

# The sqlite file lives on a mounted volume, so migrations run at start rather
# than at build time.
python manage.py migrate --noinput

exec gunicorn indian_studio_dmc.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 3 \
    --timeout 120 \
    --access-logfile - \
    --error-logfile -
