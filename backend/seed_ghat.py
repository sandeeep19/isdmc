import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "indian_studio_dmc.settings")
django.setup()

from places.models import Place
from mediaapp.models import Photo

def create_sample_ghat():
    # 1. Create a Photo object
    print("Creating sample Photo...")
    photo, created = Photo.objects.get_or_create(
        title="Assi Ghat Morning",
        defaults={
            "image_file": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Assi_Ghat_Varanasi.jpg/800px-Assi_Ghat_Varanasi.jpg",
            "description": "A beautiful morning view of Assi Ghat",
            "photographer": "Wiki Commons"
        }
    )
    if created:
        print(f"Created photo: {photo.title}")
    else:
        print(f"Photo already exists: {photo.title}")

    # 2. Create a Place (Ghat)
    print("Creating sample Place (Assi Ghat)...")
    ghat, created = Place.objects.get_or_create(
        title="Assi Ghat",
        defaults={
            "slug": "assi-ghat",
            "type": "ghat",
            "address": "Assi Ghat, Varanasi",
            "neighbourhood": "Assi",
            "short_description": "The southernmost ghat in Varanasi.",
            "long_description": "Assi Ghat is the southernmost ghat in Varanasi. To most visitors to Varanasi, it is known for being a place where long-term foreign students, researchers, and tourists live.",
            "history_story": "Assi Ghat is described in the Kashi Khand as Assi Saimbeda Tirtha.",
        }
    )
    
    # 3. Link the Photo to the Place
    ghat.images.add(photo)
    print(f"Linked photo to {ghat.title}")
    
    print("\nSuccess! You can now query this via the API.")
    print("Example: GET /api/places/")

if __name__ == "__main__":
    create_sample_ghat()
