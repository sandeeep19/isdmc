'use client';

import { useQuery } from '@tanstack/react-query';
import { eventsApi } from '@/lib/api';
import Link from 'next/link';

export default function UpcomingEvents() {
  const { data } = useQuery({
    queryKey: ['events', 'upcoming'],
    queryFn: () => eventsApi.list({ upcoming: true, limit: 3 }),
  });

  const events = data?.results || [];

  return (
    <section>
      <h2 className="font-heading text-2xl font-bold text-primary mb-6">Upcoming Events</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <Link key={event.id} href={`/events/${event.id}`} className="block card p-4 hover:shadow-lg transition-shadow">
            <h3 className="font-heading font-bold mb-2">{event.title}</h3>
            <p className="text-sm text-neutral-slate">
              {new Date(event.start_datetime).toLocaleDateString()}
            </p>
            <p className="text-xs text-neutral-slate mt-1">{event.location}</p>
          </Link>
        ))}
      </div>
      <Link href="/events" className="block mt-4 text-accent hover:text-accent-dark font-semibold">
        View All Events →
      </Link>
    </section>
  );
}
