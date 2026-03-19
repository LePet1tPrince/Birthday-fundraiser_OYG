import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, ExternalLink, Send } from 'lucide-react';
import { useAppContext } from '../../hooks/useAppContext';
import { IMPACT_RATES, getImpactUnits } from '../../data/mockData';
import DonateModal from '../event/DonateModal';
import RecapEmailModal from '../event/RecapEmailModal';
import ProgressBar from '../shared/ProgressBar';
import { Users } from 'lucide-react';
import type { Campaign } from '../../types';

export default function MyCelebrationTab() {
  const { state } = useAppContext();
  const [donateForId, setDonateForId] = useState<string | null>(null);
  const [recapForId, setRecapForId] = useState<string | null>(null);

  const myCampaigns = state.campaigns
    .filter((c) => state.userCampaignIds.includes(c.id))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (myCampaigns.length === 0) {
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

  // Combined impact across all campaigns, broken down by cause
  const impactByArea = myCampaigns.reduce<Record<string, number>>((acc, c) => {
    const raised = state.donations
      .filter((d) => d.campaignId === c.id)
      .reduce((s, d) => s + d.amount, 0);
    const units = getImpactUnits(c.impactArea, raised);
    acc[c.impactArea] = (acc[c.impactArea] ?? 0) + units;
    return acc;
  }, {});
  const totalImpactUnits = Object.values(impactByArea).reduce((s, n) => s + n, 0);
  const totalContributors = state.donations.filter((d) =>
    myCampaigns.some((c) => c.id === d.campaignId)
  ).length;

  const donateTarget = donateForId ? myCampaigns.find((c) => c.id === donateForId) ?? null : null;
  const recapTarget = recapForId ? myCampaigns.find((c) => c.id === recapForId) ?? null : null;
  const recapDonations = recapTarget ? state.donations.filter((d) => d.campaignId === recapTarget.id) : [];

  return (
    <div className="space-y-6">
      {/* Combined impact banner */}
      {totalImpactUnits > 0 && (
        <div className="bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl font-extrabold shrink-0">{totalImpactUnits}</div>
            <div>
              <p className="font-semibold text-lg">people reached across all your celebrations</p>
              <p className="text-white/80 text-sm">{totalContributors} contributor{totalContributors !== 1 ? 's' : ''} · and counting</p>
            </div>
          </div>
          <div className={`grid gap-2 ${Object.keys(impactByArea).length > 2 ? 'grid-cols-2' : 'grid-cols-2'}`}>
            {Object.entries(impactByArea).map(([area, units]) => (
              <div key={area} className="bg-white/15 rounded-xl px-4 py-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-white/90">{IMPACT_RATES[area as keyof typeof IMPACT_RATES].label}</p>
                <p className="text-xl font-extrabold">{units}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {myCampaigns.map((campaign: Campaign, index) => {
        const donations = state.donations.filter((d) => d.campaignId === campaign.id);
        const totalRaised = donations.reduce((sum, d) => sum + d.amount, 0);
        const contributorCount = donations.length;
        const rate = IMPACT_RATES[campaign.impactArea];
        const isNewest = index === 0;

        return (
          <div key={campaign.id} className="space-y-3">
            {/* Campaign card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-2 ${
                    isNewest ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {isNewest ? 'Most Recent' : 'Past Celebration'}
                  </span>
                  <h2 className="text-xl font-extrabold text-gray-900 mb-1">{campaign.name}</h2>
                  <p className="text-gray-500 text-sm mb-3">
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
                    View page
                  </Link>
                  <button
                    onClick={() => setDonateForId(campaign.id)}
                    className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
                  >
                    Give Now
                  </button>
                  <button
                    onClick={() => setRecapForId(campaign.id)}
                    className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    Send Recap
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

          </div>
        );
      })}

      {donateTarget && (
        <DonateModal campaign={donateTarget} onClose={() => setDonateForId(null)} />
      )}
      {recapTarget && (
        <RecapEmailModal
          campaign={recapTarget}
          totalRaised={recapDonations.reduce((sum, d) => sum + d.amount, 0)}
          contributorCount={recapDonations.length}
          onClose={() => setRecapForId(null)}
        />
      )}
    </div>
  );
}
