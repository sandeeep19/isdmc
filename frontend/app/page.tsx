import Hero from "@/components/home/Hero";
import FeaturedPlaces from "@/components/home/FeaturedPlaces";
import FeaturedFoods from "@/components/home/FeaturedFoods";
import HiddenGemsTeaser from "@/components/home/HiddenGemsTeaser";
import TrendingStories from "@/components/home/TrendingStories";
import UpcomingEvents from "@/components/home/UpcomingEvents";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg-cream">
      <Hero />
      <div className="w-full mx-auto px-4 md:px-12 py-12 space-y-32">
        <FeaturedPlaces />
        <FeaturedFoods />
        <HiddenGemsTeaser />
        <div className="grid md:grid-cols-2 gap-20">
          <TrendingStories />
          <UpcomingEvents />
        </div>
      </div>
    </div>
  );
}
