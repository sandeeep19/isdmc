'use client';

import { useQuery } from '@tanstack/react-query';
import { gemsApi } from '@/lib/api/gems';
import Link from 'next/link';

export default function HiddenGemsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['gems', 'approved'],
    queryFn: () => gemsApi.list({ verification_status: 'approved' }),
  });

  const gems = data?.results || data || [];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-4xl font-bold text-primary mb-2">Hidden Gems</h1>
          <p className="text-neutral-slate">Local secrets shared by insiders</p>
        </div>
        <Link href="/gems/submit" className="btn-primary">
          Share a Hidden Gem
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center py-12">Loading hidden gems...</div>
      ) : gems.length === 0 ? (
        <div className="bg-secondary rounded-xl p-12 text-center">
          <p className="text-lg text-neutral-slate mb-4">
            No local secrets here yet. Be the first to share a hidden kachori stall.
          </p>
          <Link href="/gems/submit" className="btn-primary">
            Submit a Hidden Gem
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gems.map((gem: any) => (
            <Link key={gem.id} href={`/gems/${gem.slug}`} className="card group">
              <div className="relative h-48 bg-primary overflow-hidden">
                {gem.images?.[0]?.image_file ? (
                  <img
                    src={gem.images[0].image_file}
                    alt={gem.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-primary flex items-center justify-center text-white">
                    {gem.title}
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs bg-accent text-white px-2 py-1 rounded uppercase">
                    {gem.category}
                  </span>
                  <span className="text-xs text-neutral-slate">by {gem.contributor_name}</span>
                </div>
                <h3 className="font-heading text-xl font-bold mb-2">{gem.title}</h3>
                <p className="text-neutral-slate text-sm line-clamp-3 mb-4">{gem.description}</p>
                {gem.coordinates && (
                  <p className="text-xs text-neutral-slate">📍 Has location</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
