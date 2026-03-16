import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-xl font-bold mb-3">
              <Heart className="w-5 h-5 fill-white" />
              <span>Orange You Glad</span>
            </div>
            <p className="text-white/80 text-sm">
              Turning celebrations into lasting impact for children around the world.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <div className="flex flex-col gap-2 text-sm text-white/80">
              <Link to="/" className="hover:text-white transition-colors no-underline text-white/80">Home</Link>
              <Link to="/create" className="hover:text-white transition-colors no-underline text-white/80">Create Event</Link>
              <Link to="/impact" className="hover:text-white transition-colors no-underline text-white/80">Impact Dashboard</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Our Mission</h3>
            <p className="text-white/80 text-sm">
              Every celebration is an opportunity to change lives. We connect generosity with impact across water, education, health, and emergency relief.
            </p>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} Orange You Glad. Demo project &mdash; no real transactions.</p>
        </div>
      </div>
    </footer>
  );
}
