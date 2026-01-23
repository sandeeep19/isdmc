'use client';

import { useQuery } from '@tanstack/react-query';
import { foodsApi } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';

export default function FeaturedFoods() {
  const { data, isLoading } = useQuery({
    queryKey: ['foods', 'featured'],
    queryFn: () => foodsApi.list({ limit: 3 }),
  });

  const foods = data?.results || [];

  if (isLoading) {
    return <div className="text-center py-12">Loading featured dishes...</div>;
  }

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="bg-secondary/10 absolute -left-20 -top-20 w-96 h-96 rounded-full blur-3xl -z-10" />

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div className="max-w-xl">
          <span className="text-accent font-bold tracking-[0.3em] uppercase text-xs mb-2 block">Culinary Soul</span>
          <h2 className="font-heading text-5xl font-black text-primary leading-tight">
            Flavors of <span className="text-accent">Kashi</span>
          </h2>
          <p className="text-neutral-slate mt-4 text-lg">From street-side secrets to ancient legacies, taste the city that never stops eating.</p>
        </div>
        <Link href="/explore?type=food" className="btn-primary">
          All Food Secrets
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {foods.slice(0, 3).map((food: any) => (
          <Link key={food.id} href={`/foods/${food.slug}`} className="group">
            <div className="glass-card overflow-hidden h-full flex flex-col p-4 hover:shadow-accent/10 transition-all duration-500">
              <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                {food.images?.[0]?.image_file ? (
                  <Image
                    src={food.images[0].image_file}
                    alt={food.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-secondary/30 flex items-center justify-center font-bold text-primary">
                    {food.name}
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                  <span className="text-[10px] font-black uppercase text-accent tracking-tighter">
                    {food.dish_type}
                  </span>
                </div>
              </div>
              <div className="px-2 pb-4 flex-grow">
                <h3 className="font-heading text-2xl font-black text-primary mb-3 group-hover:text-accent transition-colors">
                  {food.name}
                </h3>
                <p className="text-neutral-ink/60 text-sm line-clamp-3 mb-6 font-medium leading-relaxed">
                  {food.description}
                </p>
                <div className="flex items-center gap-2 pt-4 border-t border-primary/5">
                  <span className="text-xs font-bold text-primary uppercase">Identity:</span>
                  <span className="text-[10px] bg-secondary text-primary px-2 py-0.5 rounded-full font-bold">
                    {food.dish_type}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
