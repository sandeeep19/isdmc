import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "indian_studio_dmc.settings")
django.setup()

from foods.models import Food
from mediaapp.models import Photo

def seed_extra_dishes():
    dishes = [
        {
            "name": "Tamatar Chaat",
            "slug": "tamatar-chaat",
            "dish_type": "snack",
            "origin_story": "Spicy & tangy Banarasi chaat made from mashed tomatoes, spices, sev & chutneys.",
            "best_time": "Evening",
            "recommended_stalls": ["Deena Chaat Bhandar, Godowlia"],
            "image": {
                "title": "Vibrant Tamatar Chaat",
                "url": "https://images.unsplash.com/photo-1517244492180-2ce6838b0101?auto=format&fit=crop&q=80&w=800",
                "photographer": "Unsplash"
            }
        },
        {
            "name": "Baati Chokha",
            "slug": "baati-chokha",
            "dish_type": "meal",
            "origin_story": "Smoked wheat balls served with mashed brinjal, tomato & ghee. Authentic rustic Banaras flavor.",
            "best_time": "Lunch or Dinner",
            "recommended_stalls": ["Baati Chokha Restaurant, Lanka"],
            "image": {
                "title": "Authentic Baati Chokha Plate",
                "url": "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=800",
                "photographer": "Unsplash"
            }
        },
        {
            "name": "Chena Dahi Vada",
            "slug": "chena-dahi-vada",
            "dish_type": "sweet",
            "origin_story": "Soft paneer (chena) vadas soaked in sweetened yogurt — a unique Banaras speciality.",
            "best_time": "Breakfast or Snack",
            "recommended_stalls": ["Ram Bhandar, Thatheri Bazaar"],
            "image": {
                "title": "Soft Chena Dahi Vada",
                "url": "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?auto=format&fit=crop&q=80&w=800",
                "photographer": "Unsplash"
            }
        },
        {
            "name": "Launglatta",
            "slug": "launglatta",
            "dish_type": "sweet",
            "origin_story": "Deep-fried clove-flavored sweet stuffed with rich khoya.",
            "best_time": "Dessert",
            "recommended_stalls": ["Shree Rajbandhu, Godowlia"],
            "image": {
                "title": "Exquisite Banarasi Sweets",
                "url": "https://images.unsplash.com/photo-1589112106528-56ccf6618358?auto=format&fit=crop&q=80&w=800",
                "photographer": "Unsplash"
            }
        },
        {
            "name": "Thandai",
            "slug": "thandai",
            "dish_type": "drink",
            "origin_story": "Traditional milk drink infused with saffron, almonds, rose & spices. A spiritual refreshing drink of Kashi.",
            "best_time": "Anytime / Summer",
            "recommended_stalls": ["Blue Lassi (Thandai counter)", "Local Holi stalls"],
            "image": {
                "title": "Chilled Saffron Thandai",
                "url": "https://images.unsplash.com/photo-1623861214304-bd372370773d?auto=format&fit=crop&q=80&w=800",
                "photographer": "Unsplash"
            }
        }
    ]

    for dish_data in dishes:
        print(f"Adding/Updating dish: {dish_data['name']}...")
        
        # Create Photo
        photo, _ = Photo.objects.get_or_create(
            title=dish_data['image']['title'],
            defaults={
                "image_file": dish_data['image']['url'],
                "photographer": dish_data['image']['photographer'],
                "description": dish_data['origin_story']
            }
        )
        
        # Force update URL if photo existed
        photo.image_file = dish_data['image']['url']
        photo.save()

        # Create Food
        food, created = Food.objects.get_or_create(
            name=dish_data['name'],
            defaults={
                "slug": dish_data['slug'],
                "dish_type": dish_data['dish_type'],
                "origin_story": dish_data['origin_story'],
                "best_time": dish_data['best_time'],
                "recommended_stalls": dish_data['recommended_stalls'],
            }
        )
        
        food.images.clear()
        food.images.add(photo)
        if created:
            print(f"Created: {food.name}")
        else:
            print(f"Updated: {food.name}")

    print("\nExtra dishes seeded with reliable Unsplash URLs!")

if __name__ == "__main__":
    seed_extra_dishes()
