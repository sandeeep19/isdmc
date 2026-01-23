# Indian Studio DMC - Frontend

Next.js frontend for the Varanasi travel guide website.

## Tech Stack

- **Next.js 14** (App Router) - React framework with SSR/SSG
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling with custom theme
- **TanStack Query** - Data fetching and caching
- **React Hook Form + Zod** - Form validation
- **Mapbox GL** - Interactive maps (to be integrated)
- **Algolia** - Search (to be integrated)

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. **Create `.env.local` file:**
   ```bash
   cp .env.local.example .env.local
   ```

3. **Configure environment variables:**
   - `NEXT_PUBLIC_API_URL` - Django backend API URL (default: http://localhost:8000/api)
   - `NEXT_PUBLIC_MAPBOX_TOKEN` - Mapbox access token
   - `NEXT_PUBLIC_ALGOLIA_APP_ID` - Algolia application ID
   - `NEXT_PUBLIC_ALGOLIA_SEARCH_KEY` - Algolia search-only API key

4. **Run development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── explore/           # Explore listings
│   ├── gems/              # Hidden gems pages
│   ├── map/               # Interactive map
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── layout/           # Header, Footer
│   ├── home/             # Home page sections
│   ├── search/           # Search components
│   └── providers/        # Context providers
├── lib/                   # Utilities
│   └── api/              # API client and endpoints
└── public/               # Static assets
```

## Features Implemented

- ✅ Home page with hero, featured sections, map snapshot
- ✅ Explore page with filters
- ✅ Hidden Gems listing and submission form
- ✅ API client with JWT auth interceptors
- ✅ Responsive design with Tailwind
- ✅ TypeScript types for API responses

## Features To Implement

- [ ] Mapbox integration for interactive map
- [ ] Algolia search with autocomplete
- [ ] Place detail pages
- [ ] Food detail pages
- [ ] Stories/Articles pages
- [ ] Events calendar
- [ ] User authentication UI
- [ ] Image upload to Cloudinary
- [ ] SEO optimization (JSON-LD, meta tags)
- [ ] i18n (Hindi/English toggle)

## API Integration

The frontend consumes the Django REST API. Make sure the backend is running on `http://localhost:8000` (or update `NEXT_PUBLIC_API_URL`).

Key endpoints:
- `GET /api/places/` - List places
- `GET /api/places/{slug}/` - Place detail
- `GET /api/gems/` - List hidden gems
- `POST /api/gems/submit/` - Submit hidden gem
- `POST /api/auth/token/` - Login (JWT)

## Styling

The project uses Tailwind CSS with a custom theme matching the design spec:

- **Primary**: Ganga Blue (#0B4F6C)
- **Accent**: Banarasi Saffron (#FF8C42)
- **Secondary**: River Sand (#F2E9E4)
- **Support**: Algae Green (#6B8E23)

Typography:
- **Headings**: Merriweather (serif)
- **Body**: Inter (sans-serif)

## Deployment

Build for production:
```bash
npm run build
npm start
```

Deploy to Vercel (recommended):
```bash
vercel
```

Make sure to set environment variables in your deployment platform.
