'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { placesApi, foodsApi } from '@/lib/api';
import Link from 'next/link';

function ExploreContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || '';
  const search = searchParams.get('search') || '';

  const { data, isLoading } = useQuery<any>({
    queryKey: ['explore', type, search],
    queryFn: () => type === 'food'
      ? foodsApi.list({ search })
      : placesApi.list({ type, search }),
  });

  const results = data?.results || [];

  return (
    <>
      <h1 className="font-heading text-4xl font-bold text-primary mb-8">Explore Varanasi</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {[
          { label: 'All', value: '' },
          { label: 'Ghats', value: 'ghat' },
          { label: 'Temples', value: 'temple' },
          { label: 'Food', value: 'food' },
          { label: 'Shops', value: 'shop' },
          { label: 'Alleys', value: 'alley' },
        ].map((filter) => (
          <Link
            key={filter.label}
            href={`/explore?type=${filter.value}`}
            className={`px-4 py-2 rounded-lg ${(filter.label === 'All' && !type) || type === filter.value
              ? 'bg-primary text-white'
              : 'bg-secondary text-neutral-ink hover:bg-secondary-dark'
              }`}
          >
            {filter.label}
          </Link>
        ))}
      </div>

      <span className="text-accent font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Archive</span>
      <h1 className="text-5xl font-heading font-black text-primary mb-6">Explore <span className="text-accent">Banaras</span></h1>

      {/* Results */}
      {isLoading ? (
        <div className="text-center py-12">Loading results...</div>
      ) : results.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-neutral-slate">No results found. Try a different filter.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {results.map((item: any) => {
            const isFood = type === 'food';
            const title = item.title || item.name;
            const link = isFood ? `/foods/${item.slug}` : `/places/${item.slug}`;
            const category = isFood ? item.dish_type : item.type;

            return (
              <Link key={item.id} href={link} className="card group">
                <div className="relative h-48 bg-primary overflow-hidden">
                  {item.images?.[0]?.image_file ? (
                    <img
                      src={item.images[0].image_file}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary flex items-center justify-center text-white">
                      {title}
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent/90 backdrop-blur-sm text-white px-2 py-1 rounded text-xs uppercase font-bold tracking-wider">
                      {category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold mb-2">{title}</h3>
                  <p className="text-neutral-slate text-sm line-clamp-2">
                    {item.short_description || item.origin_story}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-neutral-slate">{item.neighbourhood || (isFood ? 'Local Speciality' : '')}</span>
                    {(item.best_time_to_visit || item.best_time) && (
                      <span className="text-xs bg-secondary px-2 py-1 rounded">
                        {item.best_time_to_visit || item.best_time}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}

export default function ExplorePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
        <ExploreContent />
      </Suspense>
    </div>
  );
}
