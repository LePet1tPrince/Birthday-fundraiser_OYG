import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, ExternalLink } from 'lucide-react';
import { useAppContext } from '../../hooks/useAppContext';
import { mockUser, IMPACT_RATES, getImpactUnits } from '../../data/mockData';
import CelebrationRecap from '../event/CelebrationRecap';
import DonorsList from '../event/DonorsList';
import DonateModal from '../event/DonateModal';
import ProgressBar from '../shared/ProgressBar';
import { Users } from 'lucide-react';

export default function MyCelebrationTab() {
  const { state } = useAppContext();
  const [showDonateModal, setShowDonateModal] = useState(false);

  const campaign = mockUser.activeCampaignId
    ? state.campaigns.find((c) => c.id === mockUser.activeCampaignId)
    : null;

  if (!campaign) {
    return (
      <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Plus className="w-8 h-8 text-orange-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No celebration page yet</h3>
        <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
          Got a birthday or milestone coming up? Create a page and let your friends celebrate you with impact instead of gifts.
        </p>
        <Link
          to="/create"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg transition-colors no-underline"
        >
          <Plus className="w-4 h-4" />
          Create My Celebration Page
        </Link>
      </div>
    );
  }

  const donations = state.donations.filter((d) => d.campaignId === campaign.id);
  const totalRaised = donations.reduce((sum, d) => sum + d.amount, 0);
  const contributorCount = donations.length;
  const hostFirstName = campaign.hostName.split(' ')[0];
  const rate = IMPACT_RATES[campaign.impactArea];
  const impactUnits = getImpactUnits(campaign.impactArea, totalRaised);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-block bg-orange-100 text-orange-600 text-xs font-bold px-2.5 py-1 rounded-full mb-2">
              Active Celebration
            </span>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-1">{campaign.name}</h2>
            <p className="text-gray-500 text-sm mb-4">
              {new Date(campaign.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              {' · '}{rate.label}
            </p>
            {campaign.message && (
              <p className="text-gray-600 text-sm italic border-l-4 border-orange-200 pl-3">
                &ldquo;{campaign.message}&rdquo;
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <Link
              to={`/event/${campaign.id}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors no-underline"
            >
              <ExternalLink className="w-4 h-4" />
              Share link
            </Link>
            <button
              onClick={() => setShowDonateModal(true)}
              className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
            >
              Give Now
            </button>
          </div>
        </div>

        {/* Progress or participant count */}
        <div className="mt-5 pt-5 border-t border-gray-100">
          {campaign.goalAmount ? (
            <ProgressBar current={totalRaised} goal={campaign.goalAmount} />
          ) : (
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-gray-900">${totalRaised.toLocaleString()} given</span>
              <span className="flex items-center gap-1 text-gray-500">
                <Users className="w-3.5 h-3.5" />
                {contributorCount} celebrating
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Quick impact callout */}
      {totalRaised > 0 && impactUnits > 0 && (
        <div className="bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl p-5 text-white flex items-center gap-4">
          <div className="text-4xl font-extrabold">{impactUnits}</div>
          <div>
            <p className="font-semibold">{rate.unitLabel}</p>
            <p className="text-white/80 text-sm">and counting — every new contribution adds to this</p>
          </div>
        </div>
      )}

      {/* Full recap */}
      <div className="rounded-2xl overflow-hidden">
        <CelebrationRecap campaign={campaign} donations={donations} />
      </div>

      {/* Message wall */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <DonorsList donations={donations} hostFirstName={hostFirstName} />
      </div>

      {showDonateModal && (
        <DonateModal campaign={campaign} onClose={() => setShowDonateModal(false)} />
      )}
    </div>
  );
}
