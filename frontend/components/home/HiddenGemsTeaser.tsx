'use client';

import { useQuery } from '@tanstack/react-query';
import { gemsApi } from '@/lib/api/gems';
import Link from 'next/link';
import Image from 'next/image';

export default function HiddenGemsTeaser() {
  const { data, isLoading } = useQuery({
    queryKey: ['gems', 'approved'],
    queryFn: () => gemsApi.list({ verification_status: 'approved' }),
  });

  const gems = data?.results || [];

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-heading text-3xl font-bold text-primary">Hidden Gems</h2>
        <div className="flex items-center gap-4">
          <Link href="/gems" className="text-accent hover:text-accent-dark font-semibold">
            View All →
          </Link>

        </div>
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
        <div className="grid md:grid-cols-3 gap-6">
          {gems.slice(0, 3).map((gem: any) => (
            <Link key={gem.id} href={`/gems/${gem.slug}`} className="card group">
              <div className="relative h-48 bg-accent overflow-hidden">
                {gem.images?.[0]?.image_file ? (
                  <Image
                    src={gem.images[0].image_file}
                    alt={gem.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    {gem.title}
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="bg-accent/90 backdrop-blur-sm text-white px-2 py-1 rounded text-xs uppercase font-bold tracking-wider">
                    {gem.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3 text-xs text-neutral-slate">
                  <span>by {gem.contributor_name}</span>
                </div>
                <h3 className="font-heading text-xl font-bold mb-2">{gem.title}</h3>
                <p className="text-neutral-slate text-sm line-clamp-3 mb-4">{gem.description}</p>
                <div className="flex items-center gap-2 text-sm text-neutral-slate">
                  <span>💚</span>
                  <span>Saved by locals</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
