# Indian Studio DMC — Django API Skeleton

Backend stack: Django 5, Django REST Framework, JWT (simplejwt), CORS, PostgreSQL-ready.

## Quick start
1. `python -m venv .venv && source .venv/bin/activate`
2. `pip install -r requirements.txt`
3. Create `.env` (see below).
4. `python manage.py migrate`
5. `python manage.py createsuperuser`
6. `python manage.py runserver 8000`

## Env template
```
DEBUG=True
SECRET_KEY=change-me
ALLOWED_HOSTS=["localhost","127.0.0.1"]
DATABASE_URL=sqlite:///db.sqlite3  # or postgres://user:pass@host:5432/db
CORS_ALLOWED_ORIGINS=["http://localhost:3000"]
```

## API surface (initial)
- `/api/places/` — list/create/update Places (filters: type, neighbourhood, tags, featured; search title/description)
- `/api/foods/` — dishes (filters: dish_type, tags)
- `/api/shops/` — shops/crafts
- `/api/gems/` — hidden gems (filters: category, status, tags; search title/desc/how_to_find)
- `/api/gems/submit/` — public submission; sets status pending
- `/api/events/` — events/festivals
- `/api/stories/` — articles/guides
- `/api/photos/` — media items
- `/api/profiles/` — contributor profiles
- `/api/auth/token/` — JWT obtain; `/api/auth/token/refresh/`

## Notes for frontend (Next.js)
- Use `Authorization: Bearer <token>` for protected writes (admin/moderator screens). Public reads are open.
- Hidden Gem submission: send minimal payload `{title, category, description, how_to_find, contributor_name, ...}`. Status is forced to `pending`.
- Images: current model stores Cloudinary (or CDN) URLs in `Photo.image_file`. Upload flow should POST to Cloudinary directly, then save URL via backend when creating/updating objects.
- Geo: latitude/longitude floats; map endpoints can expose GeoJSON by extending `PlaceViewSet`/`HiddenGemViewSet` later.
- Tags are separate in `places.Tag`; many models link to it.

## Next steps
- Add pagination settings, throttling, and captcha verification for `/api/gems/submit/`.
- Add Algolia indexing signals and map-friendly GeoJSON endpoints.
- Wire admin moderation actions (approve/reject/request changes) and trust scoring on `HiddenGem`.
