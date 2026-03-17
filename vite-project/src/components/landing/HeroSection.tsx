import { Link } from 'react-router-dom';
import { ArrowRight, Gift } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-400 to-amber-300 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
      <div className="relative max-w-5xl mx-auto px-4 py-20 sm:py-28 text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-6">
          <Gift className="w-4 h-4" />
          No gifts. Just impact.
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
          Skip the Gifts.
          <br />
          <span className="underline decoration-white/40 decoration-4 underline-offset-4">Celebrate Together.</span>
        </h1>
        <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-10">
          Create a celebration page for your birthday or milestone. Instead of gifts, friends and family give to a cause you care about — and you see your shared impact.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/create"
            className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-8 py-3.5 rounded-lg hover:bg-orange-50 transition-colors text-lg no-underline"
          >
            Create My Page
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/event/camp-1"
            className="inline-flex items-center gap-2 border-2 border-white/60 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/10 transition-colors text-lg no-underline"
          >
            See an Example
          </Link>
        </div>
      </div>
    </section>
  );
}
