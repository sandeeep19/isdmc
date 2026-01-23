'use client';

import React from 'react';
import ItineraryGenerator from '@/components/shared/ItineraryGenerator';

export default function PlanPage() {
    return (
        <div className="min-h-screen bg-secondary/10 py-20 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <span className="text-accent font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Concierge</span>
                    <h1 className="text-5xl md:text-6xl font-heading font-black text-primary mb-6 leading-tight">
                        Design Your <span className="text-accent">Legend</span>
                    </h1>
                    <p className="text-xl text-neutral-slate leading-relaxed">
                        The streets of Kashi are a labyrinth of secrets. Select your focus, and we&apos;ll craft a path that reveals the soul of the city, tailored just for you.
                    </p>
                </div>

                <ItineraryGenerator />

                <div className="mt-20 text-center max-w-xl mx-auto">
                    <p className="text-neutral-slate text-sm">
                        Our itineraries are curated by local experts and historians. By requesting a PDF, you&apos;ll connect with our Studio Curators who will provide the final document and any assistance you need for your journey.
                    </p>
                </div>
            </div>
        </div>
    );
}
