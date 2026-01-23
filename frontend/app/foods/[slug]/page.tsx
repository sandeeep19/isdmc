'use client';

import { useQuery } from '@tanstack/react-query';
import { foodsApi } from '@/lib/api';
import Link from 'next/link';
import AccessibilityBadges from '@/components/shared/AccessibilityBadges';
import BookingCTA from '@/components/shared/BookingCTA';

export default function FoodDetailPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const { data: food, isLoading } = useQuery({
        queryKey: ['foods', slug],
        queryFn: () => foodsApi.detail(slug),
    });

    if (isLoading) {
        return <div className="container mx-auto px-4 py-12 text-center">Loading...</div>;
    }

    if (!food) {
        return <div className="container mx-auto px-4 py-12 text-center">Food not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            {/* Breadcrumb */}
            <nav className="text-sm text-neutral-slate mb-4">
                <Link href="/" className="hover:text-primary">Home</Link> /{' '}
                <Link href="/explore?type=food" className="hover:text-primary">Food</Link> / {food.name}
            </nav>

            {/* Hero Image */}
            <div className="relative h-96 bg-accent rounded-xl overflow-hidden mb-8">
                {food.images?.[0]?.image_file ? (
                    <img
                        src={food.images[0].image_file}
                        alt={food.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-2xl bg-accent">
                        {food.name}
                    </div>
                )}
            </div>

            {/* Title & Badges */}
            <div className="mb-6">
                <h1 className="font-heading text-4xl font-bold text-primary mb-4">{food.name}</h1>
                <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex flex-wrap gap-2">
                        <span className="bg-accent text-white px-3 py-1 rounded-full text-sm capitalize">{food.dish_type}</span>
                        {food.spice_level && (
                            <span className="bg-secondary px-3 py-1 rounded-full text-sm capitalize">Spice: {food.spice_level}</span>
                        )}
                        {food.tags?.map((tag: any) => (
                            <span key={tag.id || tag.name} className="bg-secondary px-3 py-1 rounded-full text-sm">
                                {tag.name}
                            </span>
                        ))}
                    </div>
                    <AccessibilityBadges
                        isWheelchairAccessible={food.is_wheelchair_accessible}
                        isElderlyFriendly={food.is_elderly_friendly}
                        crowdLevel={food.crowd_level}
                    />
                </div>
            </div>

            {/* Description / Origin Story */}
            {food.origin_story && (
                <div className="mb-8">
                    <h2 className="font-heading text-2xl font-bold text-primary mb-4">Origin Story</h2>
                    <div className="prose max-w-none">
                        <p>{food.origin_story}</p>
                    </div>
                </div>
            )}

            {/* Best Time */}
            {food.best_time && (
                <div className="mb-8 p-4 bg-secondary rounded-lg">
                    <h3 className="font-bold mb-2">Best Time to Eat</h3>
                    <p>{food.best_time}</p>
                </div>
            )}

            {/* Where to Eat */}
            {food.recommended_stalls && food.recommended_stalls.length > 0 && (
                <div className="mb-8">
                    <h2 className="font-heading text-2xl font-bold text-primary mb-4">Recommended Stalls</h2>
                    <ul className="list-disc pl-5">
                        {food.recommended_stalls.map((stall: string, idx: number) => (
                            <li key={idx} className="mb-2">{stall}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Gallery */}
            {food.images && food.images.length > 1 && (
                <div className="mb-8">
                    <h2 className="font-heading text-2xl font-bold text-primary mb-4">Gallery</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        {food.images.slice(1).map((img: any, idx: number) => (
                            <div key={idx} className="relative h-48 bg-secondary rounded-lg overflow-hidden">
                                <img src={img.image_file} alt={`${food.name} ${idx + 2}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {/* Booking CTA */}
            <BookingCTA title={food.name} type="experience" />
        </div>
    );
}
