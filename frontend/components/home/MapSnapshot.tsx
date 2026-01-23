'use client';

import Link from 'next/link';

export default function MapSnapshot() {
  return (
    <section className="bg-secondary rounded-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-3xl font-bold text-primary">Explore on Map</h2>
        <Link href="/map" className="btn-primary">
          Open Full Map
        </Link>
      </div>
      <div className="bg-white rounded-lg h-96 flex items-center justify-center border-2 border-dashed border-neutral-slate">
        <div className="text-center">
          <p className="text-neutral-slate mb-4">Interactive map will load here</p>
          <p className="text-sm text-neutral-slate">Top 10 places pinned</p>
        </div>
      </div>
    </section>
  );
}
