'use client';

export default function MapPage() {
  return (
    <div className="h-screen w-screen relative">
      <div className="absolute inset-0 bg-secondary flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-primary mb-4">Interactive Map</h1>
          <p className="text-neutral-slate">
            Mapbox integration will be implemented here with clustering and filters
          </p>
        </div>
      </div>
    </div>
  );
}
