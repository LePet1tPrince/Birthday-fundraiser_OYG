import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-orange-500 no-underline">
          <Heart className="w-6 h-6 fill-orange-500" />
          <span>Orange You Glad</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/impact" className="text-gray-600 hover:text-orange-500 transition-colors text-sm font-medium no-underline">
            Impact
          </Link>
          <Link
            to="/create"
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors no-underline"
          >
            Start Fundraiser
          </Link>
        </div>
      </div>
    </nav>
  );
}
