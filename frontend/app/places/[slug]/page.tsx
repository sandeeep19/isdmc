'use client';

import { useQuery } from '@tanstack/react-query';
import { placesApi } from '@/lib/api/places';
import Link from 'next/link';
import AccessibilityBadges from '@/components/shared/AccessibilityBadges';
import BookingCTA from '@/components/shared/BookingCTA';

export default function PlaceDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { data: place, isLoading } = useQuery({
    queryKey: ['places', slug],
    queryFn: () => placesApi.detail(slug),
  });

  if (isLoading) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading...</div>;
  }

  if (!place) {
    return <div className="container mx-auto px-4 py-12 text-center">Place not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Breadcrumb */}
      <nav className="text-sm text-neutral-slate mb-4">
        <Link href="/" className="hover:text-primary">Home</Link> /{' '}
        <Link href="/explore" className="hover:text-primary">Explore</Link> / {place.title}
      </nav>

      {/* Hero Image */}
      <div className="relative h-96 bg-primary rounded-xl overflow-hidden mb-8">
        {place.images?.[0]?.image_file ? (
          <img
            src={place.images[0].image_file}
            alt={place.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-2xl">
            {place.title}
          </div>
        )}
      </div>

      {/* Title & Badges */}
      <div className="mb-6">
        <h1 className="font-heading text-4xl font-bold text-primary mb-4">{place.title}</h1>
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {place.featured && (
              <span className="bg-accent text-white px-3 py-1 rounded-full text-sm">Featured</span>
            )}
            {place.tags?.map((tag: any) => (
              <span key={tag.id || tag.name} className="bg-secondary px-3 py-1 rounded-full text-sm">
                {tag.name}
              </span>
            ))}
          </div>
          <AccessibilityBadges
            isWheelchairAccessible={place.is_wheelchair_accessible}
            isElderlyFriendly={place.is_elderly_friendly}
            crowdLevel={place.crowd_level}
          />
        </div>
        <p className="text-xl text-neutral-slate leading-relaxed">{place.short_description}</p>
      </div>

      {/* Key Info */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {place.open_hours && (
          <div className="bg-secondary p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Opening Hours</h3>
            <p className="text-sm text-neutral-slate">{place.open_hours}</p>
          </div>
        )}
        {place.entry_fee && (
          <div className="bg-secondary p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Entry Fee</h3>
            <p className="text-sm text-neutral-slate">{place.entry_fee}</p>
          </div>
        )}
        {place.best_time_to_visit && (
          <div className="bg-secondary p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Best Time</h3>
            <p className="text-sm text-neutral-slate">{place.best_time_to_visit}</p>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="prose max-w-none mb-8">
        <div dangerouslySetInnerHTML={{ __html: place.long_description }} />
      </div>

      {/* History/Story */}
      {place.history_story && (
        <div className="mb-8">
          <h2 className="font-heading text-2xl font-bold text-primary mb-4">History & Story</h2>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: place.history_story }} />
        </div>
      )}

      {/* Map */}
      {place.location && (
        <div className="mb-8">
          <h2 className="font-heading text-2xl font-bold text-primary mb-4">Location</h2>
          <div className="bg-secondary rounded-lg h-64 flex items-center justify-center">
            <p className="text-neutral-slate">Map will load here (lat: {place.location.lat}, lng: {place.location.lng})</p>
          </div>
          <p className="text-sm text-neutral-slate mt-2">{place.address}</p>
        </div>
      )}

      {/* Visitor Tips */}
      {place.visitor_tips && (
        <div className="mb-8">
          <h2 className="font-heading text-2xl font-bold text-primary mb-4">Visitor Tips</h2>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: place.visitor_tips }} />
        </div>
      )}

      {/* Gallery */}
      {place.images && place.images.length > 1 && (
        <div className="mb-8">
          <h2 className="font-heading text-2xl font-bold text-primary mb-4">Photo Gallery</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {place.images.slice(1).map((img: any, idx: number) => (
              <div key={idx} className="relative h-48 bg-primary rounded-lg overflow-hidden">
                <img src={img.image_file} alt={`${place.title} ${idx + 2}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Booking CTA */}
      <BookingCTA title={place.title} type="tour" />
    </div>
  );
}
