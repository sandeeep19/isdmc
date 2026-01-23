'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { storiesApi, eventsApi } from '@/lib/api'

export default function TrendingSection() {
  const { data: stories } = useQuery({
    queryKey: ['stories', 'trending'],
    queryFn: () => storiesApi.list({ limit: 3 }),
  })

  const { data: events } = useQuery({
    queryKey: ['events', 'upcoming'],
    queryFn: () => eventsApi.list({ upcoming: true, limit: 3 }),
  })

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Trending Stories */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-heading font-bold text-primary">Trending Stories</h2>
              <Link href="/stories" className="text-accent hover:underline">
                View All →
              </Link>
            </div>
            <div className="space-y-6">
              {stories?.results?.map((story) => (
                <Link
                  key={story.id}
                  href={`/stories/${story.slug}`}
                  className="block group"
                >
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 flex-shrink-0 bg-gray-200 rounded">
                      {story.hero_image && (
                        <img
                          src={story.hero_image.image_file}
                          alt={story.title}
                          className="w-full h-full object-cover rounded"
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg mb-1 group-hover:text-accent transition">
                        {story.title}
                      </h3>
                      <p className="text-sm text-neutral-slate line-clamp-2">{story.summary}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-heading font-bold text-primary">Upcoming Events</h2>
              <Link href="/events" className="text-accent hover:underline">
                View All →
              </Link>
            </div>
            <div className="space-y-6">
              {events?.results?.map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="block bg-secondary rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-heading font-semibold text-lg">{event.title}</h3>
                    <span className="text-xs uppercase text-accent bg-accent/10 px-2 py-1 rounded">
                      {event.event_type}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-slate mb-2">{event.location}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(event.start_datetime).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
