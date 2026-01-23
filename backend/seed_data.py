import os
import django
from django.utils import timezone
import datetime

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "indian_studio_dmc.settings")
django.setup()

from places.models import Place, Tag
from mediaapp.models import Photo
from foods.models import Food
from gems.models import HiddenGem
from events.models import Event
from stories.models import Article
from django.contrib.auth import get_user_model

def run_seed():
    print("Seeding database...")
    
    # --- 1. Photos ---
    print("Creating Photos...")
    photos_data = [
        {
            "title": "Dashashwamedh Ghat Aarti",
            "url": "/images/hero-ghats.jpg",
            "credit": "AI Generated"
        },
        {
            "title": "Manikarnika Ghat",
            "url": "/images/manikarnika.jpg",
            "credit": "AI Generated"
        },
        {
            "title": "Kashi Vishwanath Temple",
            "url": "/images/hero-temples.jpg",
            "credit": "AI Generated"
        },
        {
            "title": "Blue Lassi Shop",
            "url": "/images/lassi.jpg",
            "credit": "AI Generated"
        },
        {
            "title": "Kachori Sabzi",
            "url": "/images/kachori.jpg",
            "credit": "AI Generated"
        },
        {
            "title": "Malaiyo",
            "url": "/images/hero-food.jpg",
            "credit": "AI Generated"
        },
         {
            "title": "Lolark Kund",
            "url": "/images/hero-temples.jpg", 
            "credit": "AI Generated"
        }
    ]

    photos = {}
    for p in photos_data:
        obj, _ = Photo.objects.update_or_create(
            title=p["title"],
            defaults={"image_file": p["url"], "photographer": p["credit"]}
        )
        photos[p["title"]] = obj

    # --- 2. Tags ---
    print("Creating Tags...")
    tags_list = ["Spiritual", "Crowded", "Food", "History", "Local Favorite", "Must Visit", "Morning"]
    tags = {}
    for t in tags_list:
        obj, _ = Tag.objects.get_or_create(name=t)
        tags[t] = obj

    # --- 3. Places ---
    print("Creating Places...")
    p1, _ = Place.objects.get_or_create(
        title="Dashashwamedh Ghat",
        defaults={
            "type": "ghat",
            "address": "Dashashwamedh Ghat Rd, Varanasi",
            "neighbourhood": "Godowlia",
            "short_description": "The most famous and liveliest ghat in Varanasi.",
            "long_description": "Dashashwamedh Ghat is the main ghat in Varanasi on the Ganga River. It is located close to Vishwanath Temple and is probably the most spectacular ghat. Two Hindu legends are associated with it: according to one, Lord Brahma created it to welcome Lord Shiva. According to another legend, Lord Brahma sacrificed ten horses during Dasa-Ashwamedha yajna performed here.",
            "featured": True,
            "latitude": 25.3076,
            "longitude": 83.0104,
        }
    )
    p1.images.add(photos["Dashashwamedh Ghat Aarti"])
    p1.tags.add(tags["Spiritual"], tags["Crowded"], tags["Must Visit"])

    p2, _ = Place.objects.get_or_create(
        title="Manikarnika Ghat",
        defaults={
            "type": "ghat",
            "address": "Manikarnika Ghat, Varanasi",
            "neighbourhood": "Chowk",
            "short_description": "The primary cremation ghat in Varanasi.",
            "long_description": "One of the holiest ghats in Varanasi. It is believed that a dead human's soul finds salvation (moksha), when cremated here. Thus, scores of the elderly across the whole country seek to walk up to its edges and spend their last days absorbing the charisma of the ghat.",
            "featured": True,
        }
    )
    p2.images.add(photos["Manikarnika Ghat"])
    p2.tags.add(tags["Spiritual"], tags["History"])

    p3, _ = Place.objects.get_or_create(
        title="Kashi Vishwanath Temple",
        defaults={
            "type": "temple",
            "address": "Lahori Tola, Varanasi",
            "neighbourhood": "Godowlia",
            "short_description": "One of the most famous Hindu temples dedicated to Lord Shiva.",
            "featured": True,
        }
    )
    p3.images.add(photos["Kashi Vishwanath Temple"])
    p3.tags.add(tags["Spiritual"], tags["Must Visit"])


    # --- 4. Foods ---
    print("Creating Foods...")
    f1, _ = Food.objects.get_or_create(
        name="Blue Lassi",
        defaults={
            "dish_type": "drink",
            "origin_story": "Famous lassi shop serving traditional clay cup lassi for decades.",
            "best_time": "Afternoon",
        }
    )
    f1.images.add(photos["Blue Lassi Shop"])
    f1.tags.add(tags["Food"], tags["Local Favorite"])

    f2, _ = Food.objects.get_or_create(
        name="Kachori Sabzi",
        defaults={
            "dish_type": "breakfast",
            "origin_story": "The staple breakfast of Banaras.",
            "best_time": "Morning 7am - 10am",
        }
    )
    f2.images.add(photos["Kachori Sabzi"])
    f2.tags.add(tags["Food"], tags["Morning"])


    # --- 5. Hidden Gems ---
    print("Creating Hidden Gems...")
    g1, _ = HiddenGem.objects.get_or_create(
        title="The Ancient Lolark Kund",
        defaults={
            "category": "place",
            "description": "An ancient stepwell dedicated to the Sun God, hidden near Tulsi Ghat. It's said to be older than the rest of the city.",
            "how_to_find": "Walk south past Assi Ghat towards Tulsi Ghat. Ask locals for the 'Kund'. It is down a narrow lane.",
            "contributor_name": "Sandeep V.",
            "verification_status": "approved",
            "published_at": timezone.now()
        }
    )
    g1.images.add(photos["Lolark Kund"])

    g2, _ = HiddenGem.objects.get_or_create(
        title="Winter Malaiyo",
        defaults={
            "category": "food",
            "description": "A frothy, airy milk dessert that is only available in winter mornings. It disappears in the heat!",
            "how_to_find": "Thatheri Bazar, Chowk area. Look for large cauldrons of yellow foam.",
            "contributor_name": "Foodie Priya",
            "verification_status": "approved",
            "published_at": timezone.now()
        }
    )
    g2.images.add(photos["Malaiyo"])


    # --- 6. Events ---
    print("Creating Events...")
    e1, _ = Event.objects.get_or_create(
        title="Evening Ganga Aarti",
        defaults={
            "start_datetime": timezone.now().replace(hour=18, minute=30),
            "location_text": "Dashashwamedh Ghat",
            "description": "A daily ritual offering fire to the Goddess Ganga. A must-see spectacle.",
            "event_type": "aarti",
            "recurring": True
        }
    )
    e1.images.add(photos["Dashashwamedh Ghat Aarti"])

    e2, _ = Event.objects.get_or_create(
        title="Dev Deepawali",
        defaults={
            "start_datetime": timezone.now() + datetime.timedelta(days=30),
            "location_text": "All Ghats",
            "description": "The festival of lights of the Gods. The ghats are lit with millions of earthen lamps.",
            "event_type": "festival",
        }
    )

    # --- 7. Stories ---
    print("Creating Stories...")
    s1, _ = Article.objects.get_or_create(
        title="Why is it called Banaras?",
        defaults={
            "summary": "Exploring the etymology of the world's oldest living city.",
            "body": "Varanasi, Banaras, Kashi. The city has many names. 'Varanasi' comes from the two rivers Varuna and Assi that bound the city. 'Banaras' is the Pali corruption of Varanasi...",
            "author_name": "Editorial Team",
            "publish_date": timezone.now(),
            "hero_image": photos["Manikarnika Ghat"] 
        }
    )
    s1.related_places.add(p1, p2)

    print("Seeding Complete!")

if __name__ == "__main__":
    run_seed()
