import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "indian_studio_dmc.settings")
django.setup()

from places.models import Place

GHATS_DATA = [
    {
        "title": "Dashashwamedh Ghat",
        "short_description": "Most famous ghat, main center for rituals and Ganga Aarti.",
        "long_description": "Dashashwamedh Ghat is the main ghat in Varanasi on the Ganga River. It is located close to Vishwanath Temple and is probably the most spectacular ghat. Two Hindu legends are associated with it: according to one, Lord Brahma created it to welcome Lord Shiva; according to another, Lord Brahma sacrificed ten horses during Dasa-Ashwamedha yajna performed here.",
        "neighbourhood": "Main Ghats",
        "visitor_tips": "Don't miss the Evening Ganga Aarti (around sunset). A boat ride during aarti time offers a spectacular view.",
        "type": "ghat",
        "featured": True,
        "crowd_level": 5
    },
    {
        "title": "Manikarnika Ghat",
        "short_description": "The primary cremation ghat, holiest ground for liberation (Moksha).",
        "long_description": "One of the holiest cremation grounds in India where the eternal funeral pyre burns. It is believed that those cremated here attain Moksha (liberation from the cycle of rebirth).",
        "history_story": "Legend says that while Lord Shiva and Parvati were walking, Parvati's earring (Manikarnika) fell into a well here.",
        "neighbourhood": "Central Varanasi",
        "visitor_tips": "Be respectful and avoid taking photographs of the cremation process.",
        "type": "ghat",
        "crowd_level": 5
    },
    {
        "title": "Assi Ghat",
        "short_description": "Calm and youthful vibe, popular with students and travelers.",
        "long_description": "Assi Ghat is the southernmost ghat in Varanasi, popular with students and travelers. It is known for its peaceful vibe and morning activities.",
        "visitor_tips": "Known for morning yoga and sunrise aarti. Many great cafés are located nearby.",
        "neighbourhood": "Assi",
        "type": "ghat",
        "featured": True,
        "crowd_level": 3
    },
    {
        "title": "Raj Ghat",
        "short_description": "Scenic northern end where Ganga meets Varuna river.",
        "long_description": "Located at the northern end of Varanasi, Raj Ghat is where the Ganga meets the Varuna river. It is less crowded and very scenic compared to the central ghats.",
        "neighbourhood": "North Varanasi",
        "type": "ghat",
        "crowd_level": 2
    },
    {
        "title": "Kedar Ghat",
        "short_description": "Famous for Kedarnath Temple replica, preferred by South Indian pilgrims.",
        "long_description": "Kedar Ghat is famous for its replica of the Kedarnath Temple. It is especially preferred by pilgrims from South India.",
        "visitor_tips": "A good spot for a holy dip in the river.",
        "neighbourhood": "South Varanasi",
        "type": "ghat",
        "crowd_level": 4
    },
    {
        "title": "Harishchandra Ghat",
        "short_description": "Second most important cremation ghat, linked to King Harishchandra.",
        "long_description": "The second of the two cremation ghats in Varanasi, named after King Harishchandra who once worked at the cremation grounds here.",
        "history_story": "Linked to the legend of King Harishchandra's unwavering commitment to truth.",
        "neighbourhood": "South Varanasi",
        "type": "ghat",
        "crowd_level": 4
    },
    {
        "title": "Scindia Ghat",
        "short_description": "Famous for the partially submerged Shiva temple.",
        "long_description": "Also known as Shinde Ghat, it is famous for the partially submerged Shiva temple at the edge of the river. Features unique tilted buildings.",
        "visitor_tips": "A great spot for photography, especially of the tilted temple.",
        "neighbourhood": "Central Varanasi",
        "type": "ghat",
        "crowd_level": 3
    },
    {
        "title": "Panchganga Ghat",
        "short_description": "Mythical confluence of five rivers with a peaceful vibe.",
        "long_description": "Panchganga Ghat is believed to be the mythical confluence of five rivers (Ganga, Yamuna, Saraswati, Kirana, and Dhutapapa). It features historic mosques and temples.",
        "neighbourhood": "Central Varanasi",
        "type": "ghat",
        "crowd_level": 3
    },
    {
        "title": "Lalita Ghat",
        "short_description": "Close to Kashi Vishwanath Temple, features the Nepali Temple.",
        "long_description": "Lalita Ghat is located close to the Kashi Vishwanath Temple. It is famous for the Nepali Temple (wooden pagoda style) located nearby.",
        "neighbourhood": "Central Varanasi",
        "type": "ghat",
        "crowd_level": 4
    },
    {
        "title": "Ahilyabai Ghat",
        "short_description": "Clean and well-maintained ghat named after Queen Ahilyabai Holkar.",
        "long_description": "Named after Queen Ahilyabai Holkar of Indore, this ghat is known for being clean and well-maintained. It is a good spot for evening walks.",
        "neighbourhood": "Main Ghats",
        "type": "ghat",
        "crowd_level": 3
    }
]

def seed_ghats():
    print(f"Starting to seed {len(GHATS_DATA)} ghats...")
    for data in GHATS_DATA:
        ghat, created = Place.objects.get_or_create(
            title=data["title"],
            defaults=data
        )
        if created:
            print(f"Created: {ghat.title}")
        else:
            # Update existing if needed (optional, but good for idempotency)
            for key, value in data.items():
                setattr(ghat, key, value)
            ghat.save()
            print(f"Updated: {ghat.title}")

    print("\nSeeding complete!")

if __name__ == "__main__":
    seed_ghats()
