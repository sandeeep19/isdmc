import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-heading text-2xl font-black mb-4 text-accent">INDIAN STUDIO <span className="text-white">DMC</span></h3>
            <p className="text-sm opacity-90">
              Banaras, Seen From Inside. Every Ghat. Every Kachori. Every Secret.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/explore" className="hover:text-accent transition-colors">Places</Link></li>
              <li><Link href="/explore?type=food" className="hover:text-accent transition-colors">Food & Drinks</Link></li>
              <li><Link href="/explore?type=shop" className="hover:text-accent transition-colors">Shops & Crafts</Link></li>
              <li><Link href="/gems" className="hover:text-accent transition-colors">Hidden Gems</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contribute" className="hover:text-accent transition-colors">Contribute</Link></li>
              <li><Link href="/stories" className="hover:text-accent transition-colors">Stories</Link></li>
              <li><Link href="/events" className="hover:text-accent transition-colors">Events</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">About</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-lg text-neutral-ink focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button type="submit" className="btn-accent w-full bg-accent hover:bg-accent-dark">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-primary-light mt-8 pt-8 text-center text-sm opacity-75">
          <p>&copy; {new Date().getFullYear()} Indian Studio DMC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
