import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "indian_studio_dmc.settings")
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

# Create superuser if it doesn't exist
username = "admin"
email = "admin@indianstudiodmc.com"
password = "admin123"  # Change this after first login!

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username=username, email=email, password=password)
    print(f"Superuser created successfully!")
    print(f"Username: {username}")
    print(f"Password: {password}")
    print(f"\nIMPORTANT: Change this password after first login!")
else:
    print(f"Superuser '{username}' already exists.")
    print(f"If you forgot the password, delete the user and run this script again.")
