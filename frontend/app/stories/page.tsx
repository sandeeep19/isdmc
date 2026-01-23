'use client';

import { useQuery } from '@tanstack/react-query';
import { storiesApi } from '@/lib/api';
import Link from 'next/link';

export default function StoriesPage() {
    const { data, isLoading } = useQuery({
        queryKey: ['stories'],
        queryFn: () => storiesApi.list(),
    });

    const stories = data?.results || [];

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="font-heading text-4xl font-bold text-primary mb-8">Banaras Stories</h1>

            {isLoading ? (
                <div className="text-center py-12">Loading stories...</div>
            ) : stories.length === 0 ? (
                <div className="text-center py-12 text-neutral-slate">No stories found.</div>
            ) : (
                <div className="grid md:grid-cols-2 gap-8">
                    {stories.map((story: any) => (
                        <Link key={story.id} href={`/stories/${story.slug}`} className="card group">
                            <div className="relative h-64 bg-primary overflow-hidden">
                                {story.hero_image?.image_file ? (
                                    <img
                                        src={story.hero_image.image_file}
                                        alt={story.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white text-2xl">
                                        {story.title}
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <h2 className="font-heading text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                                    {story.title}
                                </h2>
                                <p className="text-neutral-slate mb-4 line-clamp-3">
                                    {story.summary}
                                </p>
                                <div className="flex items-center justify-between text-sm text-neutral-slate">
                                    <span>By {story.author_name}</span>
                                    <span>{new Date(story.publish_date).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
