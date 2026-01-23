'use client';

import React from 'react';
import BookingCTA from '@/components/shared/BookingCTA';
import Link from 'next/link';

export default function ExperiencesPage() {
    const categories = [
        {
            title: 'Heritage Walks',
            description: 'Journey through the narrow alleys (Galis) of Kashi to discover hidden shrines and ancient traditions.',
            icon: '🏛️',
        },
        {
            title: 'Boat Odysseys',
            description: 'Private sunrise and sunset cruises on the Ganga with expert storytellers.',
            icon: '🛶',
        },
        {
            title: 'Photography Tours',
            description: 'Capture the soul of Banaras through its people, light, and shadows with professional guidance.',
            icon: '📸',
        },
        {
            title: 'Wellness Retreats',
            description: 'Multi-day immersive experiences focusing on Yoga, Ayurveda, and the spiritual essence of the city.',
            icon: '🧘',
        }
    ];

    return (
        <div className="container mx-auto px-4 py-20 max-w-5xl">
            <div className="text-center mb-16 px-4">
                <span className="text-accent font-bold tracking-[0.3em] uppercase text-xs mb-2 block">Our Collections</span>
                <h1 className="font-heading text-5xl md:text-7xl font-black text-primary mb-8 leading-tight">Curated <span className="text-accent">Experiences</span></h1>
                <p className="text-xl text-neutral-slate max-w-3xl mx-auto leading-relaxed border-l-4 border-accent pl-8 py-2 bg-white/5 backdrop-blur-sm rounded-r-2xl italic font-medium">
                    Beyond a guide, we are your collaborators in crafting unforgettable memories in Banaras, the world's oldest living city.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
                {categories.map((cat, idx) => (
                    <div key={idx} className="group p-8 bg-white border border-primary/5 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1">
                        <div className="text-4xl mb-6 bg-primary/5 w-16 h-16 flex items-center justify-center rounded-2xl group-hover:bg-primary/10 transition-colors">
                            {cat.icon}
                        </div>
                        <h2 className="font-heading text-2xl font-bold text-primary mb-4">{cat.title}</h2>
                        <p className="text-neutral-ink leading-relaxed mb-6 opacity-80">{cat.description}</p>
                        <div className="flex items-center text-accent font-bold group-hover:gap-2 transition-all">
                            Learn More
                            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>



            <BookingCTA
                title="Curated Studio Experiences"
                type="experience"
            />
        </div>
    );
}
