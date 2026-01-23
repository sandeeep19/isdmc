'use client'

import { useQuery } from '@tanstack/react-query'
import { placesApi, foodsApi } from '@/lib/api'
import Link from 'next/link'
import Image from 'next/image'

export default function FeaturedSection() {
  const { data: places } = useQuery({
    queryKey: ['places', 'featured'],
    queryFn: () => placesApi.list({ featured: true, limit: 6 }),
  })

  const { data: foods } = useQuery({
    queryKey: ['foods', 'featured'],
    queryFn: () => foodsApi.list({ limit: 6 }),
  })

  return (
    <section className="py-16 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Ghats */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-heading font-bold text-primary">Featured Ghats</h2>
            <Link href="/explore?type=ghat" className="text-accent hover:underline">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {places?.results?.slice(0, 3).map((place: any) => (
              <Link
                key={place.id}
                href={`/places/${place.slug}`}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
              >
                <div className="relative h-48 bg-gray-200">
                  {place.images?.[0]?.image_file && (
                    <Image
                      src={place.images[0].image_file}
                      alt={place.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-semibold text-lg mb-2">{place.title}</h3>
                  <p className="text-sm text-neutral-slate line-clamp-2">{place.short_description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Dishes */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-heading font-bold text-primary">Featured Dishes</h2>
            <Link href="/explore?type=food" className="text-accent hover:underline">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {foods?.results?.slice(0, 3).map((food: any) => (
              <Link
                key={food.id}
                href={`/foods/${food.slug}`}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
              >
                <div className="relative h-48 bg-gray-200">
                  {food.images?.[0]?.image_file && (
                    <Image
                      src={food.images[0].image_file}
                      alt={food.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-semibold text-lg mb-2">{food.name}</h3>
                  <p className="text-sm text-neutral-slate">{food.dish_type}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
