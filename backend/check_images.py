import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "indian_studio_dmc.settings")
django.setup()

from places.models import Place
from foods.models import Food

print("--- Featured Places (Ghats) ---")
for p in Place.objects.filter(featured=True):
    print(f"Place: {p.title}")
    for img in p.images.all():
        print(f"  Image: {img.image_file}")

print("\n--- Featured Foods ---")
for f in Food.objects.all():
    print(f"Food: {f.name}")
    for img in f.images.all():
        print(f"  Image: {img.image_file}")
