'use client';

import { useQuery } from '@tanstack/react-query';
import { storiesApi } from '@/lib/api';
import Link from 'next/link';
import BookingCTA from '@/components/shared/BookingCTA';

export default function StoryDetailPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const { data: story, isLoading } = useQuery({
        queryKey: ['stories', slug],
        queryFn: () => storiesApi.detail(slug),
    });

    if (isLoading) {
        return <div className="container mx-auto px-4 py-12 text-center">Loading...</div>;
    }

    if (!story) {
        return <div className="container mx-auto px-4 py-12 text-center">Story not found</div>;
    }

    return (
        <article className="container mx-auto px-4 py-12 max-w-3xl">
            <nav className="text-sm text-neutral-slate mb-6">
                <Link href="/" className="hover:text-primary">Home</Link> /{' '}
                <Link href="/stories" className="hover:text-primary">Stories</Link> / {story.title}
            </nav>

            <header className="mb-8">
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4 leading-tight">
                    {story.title}
                </h1>
                <div className="flex items-center gap-4 text-neutral-slate">
                    <span>By {story.author_name}</span>
                    <span>•</span>
                    <span>{new Date(story.publish_date).toLocaleDateString()}</span>
                </div>
            </header>

            {story.hero_image?.image_file && (
                <div className="relative h-[400px] rounded-xl overflow-hidden mb-12 shadow-xl">
                    <img
                        src={story.hero_image.image_file}
                        alt={story.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            <div className="prose prose-lg max-w-none prose-primary">
                <p className="lead text-xl text-neutral-slate font-medium mb-8">
                    {story.summary}
                </p>
                <div className="whitespace-pre-line text-neutral-ink leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: story.body }} />
            </div>

            {/* Tags */}
            {story.tags && story.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t">
                    {story.tags.map((tag: any) => (
                        <span key={tag.id || tag.name} className="bg-secondary px-3 py-1 rounded-full text-sm">
                            #{tag.name}
                        </span>
                    ))}
                </div>
            )}
            {/* Booking CTA */}
            <BookingCTA title={story.title} type="tour" />
        </article>
    );
}
