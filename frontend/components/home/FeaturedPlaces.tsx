'use client';

import { useQuery } from '@tanstack/react-query';
import { placesApi } from '@/lib/api/places';
import Link from 'next/link';
import Image from 'next/image';

export default function FeaturedPlaces() {
  const { data, isLoading } = useQuery({
    queryKey: ['places', 'featured'],
    queryFn: () => placesApi.featured(),
  });

  if (isLoading) {
    return <div className="text-center py-12">Loading featured places...</div>;
  }

  const places = data?.results || data || [];

  return (
    <section className="py-20 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-accent font-bold tracking-[0.3em] uppercase text-xs mb-2 block">The Sacred River</span>
          <h2 className="font-heading text-5xl font-black text-primary leading-tight">Ghats & <span className="text-accent">Stories</span></h2>
        </div>
        <Link href="/explore?type=ghat" className="btn-secondary whitespace-nowrap">
          View All Ghats
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {places.slice(0, 3).map((place: any) => (
          <Link key={place.id} href={`/places/${place.slug}`} className="group relative">
            <div className="relative h-[400px] rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-700 group-hover:-translate-y-2">
              {place.images?.[0]?.image_file ? (
                <Image
                  src={place.images[0].image_file}
                  alt={place.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                />) : (
                <div className="w-full h-full bg-primary flex items-center justify-center text-white font-black text-2xl">
                  {place.title}
                </div>
              )}

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <span className="bg-accent text-white px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-widest mb-4 inline-block">
                  {place.type}
                </span>
                <h3 className="font-heading text-3xl font-black mb-2 group-hover:text-secondary transition-colors leading-tight">
                  {place.title}
                </h3>
                <p className="text-white/70 text-sm line-clamp-2 font-medium">
                  {place.short_description}
                </p>
              </div>
            </div>

            {/* Hover Decor */}
            <div className="absolute -inset-2 border border-accent/0 rounded-[2.5rem] group-hover:border-accent/40 transition-all duration-500 -z-10" />
          </Link>
        ))}
      </div>
    </section>
  );
}
