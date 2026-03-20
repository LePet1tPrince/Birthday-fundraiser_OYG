import { ArrowRight, ExternalLink } from 'lucide-react';
import { IMPACT_RATES, getCampaignContributors, getCampaignTotal, getImpactUnits, mockUser, monthlySubscriptions, oneTimeGifts } from '../../data/mockData';

import { Link } from 'react-router-dom';
import { useAppContext } from '../../hooks/useAppContext';

export default function ProfileSidebar() {
  const { state } = useAppContext();
  const user = mockUser;

  const campaign = state.activeCampaignId
    ? state.campaigns.find((c) => c.id === state.activeCampaignId)
    : null;

  // Personal giving total
  const allPersonal = [...monthlySubscriptions, ...oneTimeGifts];
  const personalTotal = allPersonal.reduce((sum, g) => sum + g.amount, 0);
  const personalUnits = allPersonal.reduce(
    (sum, g) => sum + Math.floor(g.amount / IMPACT_RATES[g.impactArea].costPerUnit), 0
  );

  // Community giving total (from campaign donations)
  const myCampaigns = state.campaigns.filter((c) => state.userCampaignIds.includes(c.id));
  const communityDonations = state.donations.filter((d) => myCampaigns.some((c) => c.id === d.campaignId));
  const communityTotal = communityDonations.reduce((sum, d) => sum + d.amount, 0);
  const communityUnits = myCampaigns.reduce((sum, c) => {
    const total = getCampaignTotal(c.id, state.donations);
    return sum + getImpactUnits(c.impactArea, total);
  }, 0);

  const hasCommunity = communityDonations.length > 0;
  const combinedTotal = personalTotal + communityTotal;
  const combinedUnits = personalUnits + communityUnits;

  const campaignDonations = campaign
    ? state.donations.filter((d) => d.campaignId === campaign.id)
    : [];
  const campaignTotal = campaignDonations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <aside className="w-64 shrink-0 flex flex-col">
      {/* User card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
        <div className="flex flex-col items-center text-center mb-5">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 text-white font-extrabold text-xl flex items-center justify-center mb-3 shadow-sm">
            {user.initials}
          </div>
          <p className="font-bold text-gray-900 text-lg leading-tight">{user.firstName} {user.lastName}</p>
          <p className="text-xs text-gray-400 mt-1">Member since {user.memberSince}</p>
        </div>

        {/* Reach — hero number */}
        <div className={`bg-orange-50 rounded-xl p-4 text-center ${hasCommunity ? 'mb-3' : ''}`}>
          <p className="text-3xl font-extrabold text-orange-600">
            {(hasCommunity ? combinedUnits : personalUnits).toLocaleString()}
          </p>
          <p className="text-sm font-semibold text-gray-700 mt-0.5">people reached</p>
          <p className="text-xs text-gray-400 mt-1">
            ${(hasCommunity ? combinedTotal : personalTotal).toLocaleString()} {hasCommunity ? 'combined giving' : 'given'}
          </p>
        </div>

        {/* Personal vs community split — only when community giving exists */}
        {hasCommunity && (
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-lg font-extrabold text-gray-800">{personalUnits}</p>
              <p className="text-xs text-gray-500 mt-0.5">from you</p>
              <p className="text-xs text-gray-400">${personalTotal.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-lg font-extrabold text-gray-800">{communityUnits}</p>
              <p className="text-xs text-gray-500 mt-0.5">from your community</p>
              <p className="text-xs text-gray-400">${communityTotal.toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>

      {/* Active celebration mini card */}
      {campaign && (
        <div className="bg-gradient-to-br from-orange-500 to-amber-400 rounded-2xl p-4 text-white">
          <p className="text-xs font-bold uppercase tracking-wide text-white/70 mb-1">Active page</p>
          <p className="font-bold text-sm leading-snug mb-2">{campaign.name}</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-extrabold">${campaignTotal.toLocaleString()}</p>
              <p className="text-xs text-white/70">{getCampaignContributors(campaign.id, state.donations)} celebrating</p>
            </div>
            <Link
              to={`/event/${campaign.id}`}
              target="_blank"
              className="flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors no-underline"
            >
              View page <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}

      {/* Create a new celebration */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 text-center">
        <p className="text-sm font-bold text-gray-900 mb-1">Got an occasion coming up?</p>
        <p className="text-xs text-gray-500 mb-3">Let friends celebrate you with impact instead of gifts.</p>
        <Link
          to="/create"
          className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors no-underline"
        >
          Create a page <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </aside>
  );
}
