import { Link } from 'react-router-dom';
import { ArrowRight, Cake, Sparkles } from 'lucide-react';
import { useAppContext } from '../../hooks/useAppContext';
import { getCampaignTotal, getCampaignContributors } from '../../data/mockData';
import CampaignCard from '../landing/CampaignCard';

export default function GiveAGiftTab() {
  const { state } = useAppContext();

  const otherCelebrations = state.campaigns.filter((c) => c.hostName !== 'Timothy Brooks');

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

      {/* Other active celebrations to give to */}
      {otherCelebrations.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="w-5 h-5 text-orange-500" />
            <h3 className="font-bold text-gray-900">Celebrations you can join</h3>
          </div>
          <p className="text-sm text-gray-500 mb-5">
            Friends and family with active pages — give instead of buying a gift.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherCelebrations.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                totalRaised={getCampaignTotal(campaign.id, state.donations)}
                contributorCount={getCampaignContributors(campaign.id, state.donations)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
