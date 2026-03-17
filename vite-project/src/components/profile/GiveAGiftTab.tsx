import { Link } from 'react-router-dom';
import { ArrowRight, Cake } from 'lucide-react';

export default function GiveAGiftTab() {
  return (
    <div className="space-y-6">
      {/* Create CTA */}
      <div className="bg-gradient-to-br from-orange-500 via-orange-400 to-amber-300 rounded-2xl p-8 text-white text-center">
        <Cake className="w-10 h-10 mx-auto mb-3 opacity-90" />
        <h2 className="text-2xl font-extrabold mb-2">Got an occasion coming up?</h2>
        <p className="text-white/85 text-sm max-w-md mx-auto mb-6">
          Create a celebration page in minutes. Pick a cause, write your message, and let your friends celebrate you with impact instead of stuff.
        </p>
        <Link
          to="/create"
          className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-6 py-3 rounded-lg hover:bg-orange-50 transition-colors no-underline"
        >
          Create a Celebration Page
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
