'use client';

import { useQuery } from '@tanstack/react-query';
import { gemsApi } from '@/lib/api/gems';
import Link from 'next/link';
import AccessibilityBadges from '@/components/shared/AccessibilityBadges';
import BookingCTA from '@/components/shared/BookingCTA';

export default function HiddenGemDetailPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const { data: gem, isLoading } = useQuery({
        queryKey: ['gems', slug],
        queryFn: () => gemsApi.detail(slug),
    });

    if (isLoading) {
        return <div className="container mx-auto px-4 py-12 text-center">Loading...</div>;
    }

    if (!gem) {
        return <div className="container mx-auto px-4 py-12 text-center">Hidden Gem not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            {/* Breadcrumb */}
            <nav className="text-sm text-neutral-slate mb-4">
                <Link href="/" className="hover:text-primary">Home</Link> /{' '}
                <Link href="/gems" className="hover:text-primary">Hidden Gems</Link> / {gem.title}
            </nav>

            {/* Hero Image */}
            <div className="relative h-96 bg-primary rounded-xl overflow-hidden mb-8">
                {gem.images?.[0]?.image_file ? (
                    <img
                        src={gem.images[0].image_file}
                        alt={gem.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-2xl">
                        {gem.title}
                    </div>
                )}
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <div className="flex items-center gap-3">
                    <span className="bg-accent text-white px-3 py-1 rounded-full text-sm uppercase font-semibold">
                        {gem.category}
                    </span>
                    <span className="text-neutral-slate text-sm">
                        Shared by {gem.contributor_name}
                    </span>
                </div>
                <AccessibilityBadges
                    isWheelchairAccessible={gem.is_wheelchair_accessible}
                    isElderlyFriendly={gem.is_elderly_friendly}
                    crowdLevel={gem.crowd_level}
                />
            </div>
            <h1 className="font-heading text-4xl font-bold text-primary mb-4">{gem.title}</h1>

            {/* Description */}
            <div className="prose max-w-none mb-8">
                <h2 className="font-heading text-2xl font-bold text-primary mb-4">The Secret</h2>
                <p className="text-lg">{gem.description}</p>
            </div>

            {/* How to Find */}
            <div className="bg-secondary p-6 rounded-xl mb-8">
                <h2 className="font-heading text-2xl font-bold text-primary mb-4">How to Find It</h2>
                <p>{gem.how_to_find}</p>

                {gem.coordinates && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm font-mono text-neutral-slate">
                            GPS: {gem.coordinates.lat}, {gem.coordinates.lng}
                        </p>
                    </div>
                )}
            </div>

            {/* Accessibility / Difficulty */}
            {gem.difficulty_accessibility && (
                <div className="mb-8">
                    <h3 className="font-bold text-lg mb-2">Accessibility Note</h3>
                    <p className="text-neutral-slate">{gem.difficulty_accessibility}</p>
                </div>
            )}

            {/* Gallery */}
            {gem.images && gem.images.length > 1 && (
                <div className="mb-8">
                    <h2 className="font-heading text-2xl font-bold text-primary mb-4">More Photos</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        {gem.images.slice(1).map((img: any, idx: number) => (
                            <div key={idx} className="relative h-48 bg-primary rounded-lg overflow-hidden">
                                <img src={img.image_file} alt={`${gem.title} ${idx + 2}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tags */}
            {gem.tags && gem.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-8">
                    {gem.tags.map((tag: any) => (
                        <span key={tag.id || tag.name} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                            #{tag.name}
                        </span>
                    ))}
                </div>
            )}

            {/* Booking CTA */}
            <BookingCTA title={gem.title} type="experience" />
        </div>
    );
}
