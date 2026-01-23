'use client';

import { useQuery } from '@tanstack/react-query';
import { eventsApi } from '@/lib/api';
import Link from 'next/link';

export default function EventsPage() {
    const { data, isLoading } = useQuery({
        queryKey: ['events'],
        queryFn: () => eventsApi.list({ upcoming: true }),
    });

    const events = data?.results || [];

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <h1 className="font-heading text-4xl font-bold text-primary">Upcoming Events</h1>
                <div className="bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold">
                    Culture & Festivals
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-12">Loading events...</div>
            ) : events.length === 0 ? (
                <div className="bg-secondary rounded-xl p-12 text-center">
                    <p className="text-lg text-neutral-slate">No upcoming events found. Check back soon for the next festival!</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {events.map((event: any) => (
                        <div key={event.id} className="card overflow-hidden flex flex-col md:flex-row">
                            <div className="md:w-64 h-48 md:h-auto bg-primary relative shrink-0">
                                {event.images?.[0]?.image_file ? (
                                    <img
                                        src={event.images[0].image_file}
                                        alt={event.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white font-bold p-4 text-center">
                                        {event.title}
                                    </div>
                                )}
                            </div>
                            <div className="p-6 flex-grow">
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                    <span className="bg-secondary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary">
                                        {event.event_type}
                                    </span>
                                    <span className="text-sm text-neutral-slate font-medium">
                                        📅 {new Date(event.start_datetime).toLocaleDateString()} at {new Date(event.start_datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <h2 className="font-heading text-2xl font-bold mb-3 text-primary">{event.title}</h2>
                                <p className="text-neutral-ink mb-4 leading-relaxed line-clamp-2">
                                    {event.description}
                                </p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-sm font-medium text-neutral-slate">📍 {event.location}</span>
                                    {event.ticket_link && (
                                        <a href={event.ticket_link} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm px-4 py-2">
                                            Book Now
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
