import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ShareButtons from './ShareButtons';

interface ShareModalProps {
  campaignId: string;
  campaignName: string;
}

export default function ShareModal({ campaignId, campaignName }: ShareModalProps) {
  const navigate = useNavigate();

  const shareUrl = `${window.location.origin}/event/${campaignId}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        <button
          onClick={() => navigate(`/event/${campaignId}`)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎉</span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Your page is live!</h2>
          <p className="text-gray-500 text-sm">Share it with friends and family so they can celebrate with you.</p>
        </div>

        {/* URL preview */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500 font-mono mb-6 truncate">
          {shareUrl}
        </div>

        <ShareButtons campaignName={campaignName} />

        <button
          onClick={() => navigate(`/event/${campaignId}`)}
          className="mt-6 w-full text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          Go to my page →
        </button>
      </div>
    </div>
  );
}
