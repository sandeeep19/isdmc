'use client';

import { useQuery } from '@tanstack/react-query';
import { storiesApi } from '@/lib/api';
import Link from 'next/link';

export default function TrendingStories() {
  const { data } = useQuery({
    queryKey: ['stories', 'trending'],
    queryFn: () => storiesApi.list({ limit: 3 }),
  });

  const stories = data?.results || [];

  return (
    <section>
      <h2 className="font-heading text-2xl font-bold text-primary mb-6">Trending Stories</h2>
      <div className="space-y-4">
        {stories.map((story) => (
          <Link key={story.id} href={`/stories/${story.slug}`} className="block card p-4 hover:shadow-lg transition-shadow">
            <h3 className="font-heading font-bold mb-2">{story.title}</h3>
            <p className="text-sm text-neutral-slate line-clamp-2">
              {story.summary}
            </p>
          </Link>
        ))}
      </div>
      <Link href="/stories" className="block mt-4 text-accent hover:text-accent-dark font-semibold">
        View All Stories →
      </Link>
    </section>
  );
}
