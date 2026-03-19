import { Outlet } from 'react-router-dom';
import { Heart, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockUser } from '../../data/mockData';
import NotificationToast from '../shared/NotificationToast';
import Footer from './Footer';

export default function ProfileLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top nav — slim authenticated bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 h-14 flex items-center justify-between px-6">
        <Link to="/profile" className="flex items-center gap-2 text-lg font-bold text-orange-500 no-underline">
          <Heart className="w-5 h-5 fill-orange-500" />
          Orange You Glad
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <div className="w-8 h-8 rounded-full bg-orange-500 text-white font-bold text-xs flex items-center justify-center">
              {mockUser.initials}
            </div>
            <span className="hidden sm:block font-medium">{mockUser.firstName} {mockUser.lastName}</span>
          </div>
          <button className="text-gray-400 hover:text-gray-600 transition-colors" title="Sign out">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <NotificationToast />
    </div>
  );
}
