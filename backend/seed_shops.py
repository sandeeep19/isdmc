import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "indian_studio_dmc.settings")
django.setup()

from places.models import Place
from mediaapp.models import Photo

def seed_shops():
    shops = [
        {
            "title": "Suvidha Shadi",
            "slug": "suvidha-shadi",
            "type": "shop",
            "address": "Godowlia, Varanasi",
            "neighbourhood": "Godowlia",
            "short_description": "Exquisite Banarasi Saree collection and wedding attire.",
            "long_description": "Suvidha Shadi is a premier destination for traditional Banarasi Sarees. Known for their intricate zari work and authentic craftsmanship, it is a must-visit for wedding shopping in Varanasi.",
            "image": {
                "title": "Banarasi Saree Display",
                "url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
                "photographer": "Unsplash"
            }
        },
        {
            "title": "Sandeep Wood Toy Shop",
            "slug": "sandeep-wood-toy-shop",
            "type": "shop",
            "address": "Khojwan, Varanasi",
            "neighbourhood": "Khojwan",
            "short_description": "Authentic wooden toys and lacware from Varanasi.",
            "long_description": "Varanasi is famous for its wooden toys, and Sandeep's shop preserves this age-old tradition. From vibrant dolls to intricate puzzle sets, every item is hand-carved and painted with natural colors.",
            "image": {
                "title": "Handcrafted Wooden Toys",
                "url": "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800",
                "photographer": "Unsplash"
            }
        }
    ]

    for shop_data in shops:
        print(f"Adding shop: {shop_data['title']}...")
        
        # Create Photo
        photo, _ = Photo.objects.get_or_create(
            title=shop_data['image']['title'],
            defaults={
                "image_file": shop_data['image']['url'],
                "photographer": shop_data['image']['photographer'],
                "description": shop_data['short_description']
            }
        )

        # Create Place
        shop, created = Place.objects.get_or_create(
            title=shop_data['title'],
            defaults={
                "slug": shop_data['slug'],
                "type": shop_data['type'],
                "address": shop_data['address'],
                "neighbourhood": shop_data['neighbourhood'],
                "short_description": shop_data['short_description'],
                "long_description": shop_data['long_description'],
            }
        )
        
        shop.images.add(photo)
        if created:
            print(f"Created: {shop.title}")
        else:
            print(f"Already exists: {shop.title}")

    print("\nShops seeded successfully!")

if __name__ == "__main__":
    seed_shops()
