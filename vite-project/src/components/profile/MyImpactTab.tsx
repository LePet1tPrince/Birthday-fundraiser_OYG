import { Gift, Package, RefreshCw, Shield, Star, TrendingUp, Zap } from 'lucide-react';
import { IMPACT_RATES, getCampaignTotal, getImpactUnits, monthlySubscriptions, oneTimeGifts } from '../../data/mockData';

import AnimatedCounter from '../shared/AnimatedCounter';
import type { ImpactArea } from '../../types';
import { useAppContext } from '../../hooks/useAppContext';

const AREA_ICONS: Record<ImpactArea, React.ElementType> = {
  protect: Shield,
  respond: Zap,
  equip: Package,
  empower: Star,
};

const AREA_COLORS: Record<ImpactArea, string> = {
  protect: 'text-purple-500 bg-purple-50 border-purple-100',
  respond: 'text-red-500 bg-red-50 border-red-100',
  equip: 'text-blue-500 bg-blue-50 border-blue-100',
  empower: 'text-amber-500 bg-amber-50 border-amber-100',
};

export default function MyImpactTab() {
  const { state } = useAppContext();

  const myCampaigns = state.campaigns.filter((c) => state.userCampaignIds.includes(c.id));

  // --- Personal giving ---
  const allPersonal = [...monthlySubscriptions, ...oneTimeGifts];
  const personalTotal = allPersonal.reduce((sum, g) => sum + g.amount, 0);

  // Active monthly subs (de-duped by label — show current rate not history)
  const activeSubs = Object.values(
    monthlySubscriptions.reduce<Record<string, { label: string; impactArea: ImpactArea; amount: number }>>((acc, s) => {
      acc[s.label] = { label: s.label, impactArea: s.impactArea, amount: s.amount };
      return acc;
    }, {})
  );

  const personalImpactUnits = allPersonal.reduce((sum, g) => {
    return sum + Math.floor(g.amount / IMPACT_RATES[g.impactArea].costPerUnit);
  }, 0);

  // --- Community giving (campaign donations from friends) ---
  const communityDonations = state.donations.filter((d) =>
    myCampaigns.some((c) => c.id === d.campaignId)
  );
  const communityTotal = communityDonations.reduce((sum, d) => sum + d.amount, 0);
  const communityContributors = communityDonations.length;

  const communityImpactByCause = myCampaigns.reduce<Record<string, { area: ImpactArea; amount: number; units: number; label: string }>>((acc, campaign) => {
    const total = getCampaignTotal(campaign.id, state.donations);
    const area = campaign.impactArea;
    const key = area;
    if (!acc[key]) acc[key] = { area, amount: 0, units: 0, label: IMPACT_RATES[area].label };
    acc[key].amount += total;
    acc[key].units += Math.floor(total / IMPACT_RATES[area].costPerUnit);
    return acc;
  }, {});

  const communityImpactUnits = Object.values(communityImpactByCause).reduce((sum, d) => sum + d.units, 0);

  // --- Combined ---
  const combinedTotal = personalTotal + communityTotal;
  const combinedUnits = personalImpactUnits + communityImpactUnits;

  const hasCommunity = communityContributors > 0;

  return (
    <div className="space-y-6">

      {/* ── Impact banner ── */}
      <div className="bg-gradient-to-br from-orange-500 via-orange-400 to-amber-300 rounded-2xl p-6 text-white">
        <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2">Your total impact</p>
        <div className="text-center mb-4">
          <p className="text-6xl font-extrabold leading-none">
            <AnimatedCounter end={hasCommunity ? combinedUnits : personalImpactUnits} />
          </p>
          <p className="text-white/90 text-lg font-semibold mt-1">people reached</p>
          <p className="text-white/60 text-sm mt-1">
            ${(hasCommunity ? combinedTotal : personalTotal).toLocaleString()} {hasCommunity ? 'combined giving' : 'given'}
          </p>
        </div>
        {hasCommunity && (
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/15 rounded-xl p-3 text-center">
              <p className="text-xl font-extrabold"><AnimatedCounter end={personalImpactUnits} /></p>
              <p className="text-white/70 text-xs mt-0.5">from your giving</p>
              <p className="text-white/50 text-xs">${personalTotal.toLocaleString()}</p>
            </div>
            <div className="bg-white/15 rounded-xl p-3 text-center">
              <p className="text-xl font-extrabold"><AnimatedCounter end={communityImpactUnits} /></p>
              <p className="text-white/70 text-xs mt-0.5">from your community</p>
              <p className="text-white/50 text-xs">${communityTotal.toLocaleString()} · {communityContributors} people</p>
            </div>
          </div>
        )}
      </div>

      {/* ── My Personal Giving ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            <h3 className="font-bold text-gray-900">My Personal Giving</h3>
          </div>
          <div className="text-right">
            <p className="text-sm font-extrabold text-gray-900">{personalImpactUnits} reached</p>
            <p className="text-xs text-gray-400">${personalTotal.toLocaleString()}</p>
          </div>
        </div>
        <p className="text-xs text-gray-400 mb-5">Your direct contributions — subscriptions and one-time gifts</p>

        {/* Active monthly subscriptions */}
        {activeSubs.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              <RefreshCw className="w-3.5 h-3.5" />
              Monthly subscriptions
            </div>
            <div className="space-y-2">
              {activeSubs.map((sub) => {
                const Icon = AREA_ICONS[sub.impactArea];
                const colorClass = AREA_COLORS[sub.impactArea];
                const unitsPerMonth = Math.floor(sub.amount / IMPACT_RATES[sub.impactArea].costPerUnit);
                return (
                  <div key={sub.label} className={`flex items-center gap-3 p-3 rounded-xl border ${colorClass}`}>
                    <div className="p-2 rounded-lg bg-white">
                      <Icon className={`w-4 h-4 ${colorClass.split(' ')[0]}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{IMPACT_RATES[sub.impactArea].label}</p>
                      <p className="text-xs text-gray-500">${sub.amount}/mo</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-base font-extrabold text-gray-900">{unitsPerMonth}</p>
                      <p className="text-xs text-gray-500">people/mo</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* One-time gifts */}
        {oneTimeGifts.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              <Gift className="w-3.5 h-3.5" />
              One-time gifts
            </div>
            <div className="space-y-2">
              {oneTimeGifts.map((gift) => {
                const Icon = AREA_ICONS[gift.impactArea];
                const colorClass = AREA_COLORS[gift.impactArea];
                const units = Math.floor(gift.amount / IMPACT_RATES[gift.impactArea].costPerUnit);
                return (
                  <div key={gift.id} className={`flex items-center gap-3 p-3 rounded-xl border ${colorClass}`}>
                    <div className="p-2 rounded-lg bg-white">
                      <Icon className={`w-4 h-4 ${colorClass.split(' ')[0]}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{gift.label}</p>
                      <p className="text-xs text-gray-500">
                        {units > 0 ? `${units} ${IMPACT_RATES[gift.impactArea].unitLabel}` : IMPACT_RATES[gift.impactArea].label}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-base font-extrabold text-gray-900">{units}</p>
                      <p className="text-xs text-gray-500">people reached</p>
                      <p className="text-xs text-gray-400">${gift.amount} · {new Date(gift.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── Community Impact — only shown once user has celebration page contributions ── */}
      {hasCommunity && <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-orange-500" />
            <h3 className="font-bold text-gray-900">Collaborative Impact</h3>
          </div>
          <div className="text-right">
            <p className="text-sm font-extrabold text-gray-900">{communityImpactUnits} reached</p>
            <p className="text-xs text-gray-400">${communityTotal.toLocaleString()}</p>
          </div>
        </div>
        <p className="text-xs text-gray-400 mb-5">What your friends and family gave through your celebration pages</p>

        {/* Summary stats */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-orange-50 rounded-xl p-3 text-center">
            <p className="text-xl font-extrabold text-orange-600">{communityContributors}</p>
            <p className="text-xs text-gray-500 mt-0.5">people celebrated with you</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-3 text-center">
            <p className="text-xl font-extrabold text-orange-600">{communityImpactUnits}</p>
            <p className="text-xs text-gray-500 mt-0.5">people reached</p>
          </div>
        </div>

        {/* By cause */}
        <div className="space-y-2">
          {Object.values(communityImpactByCause).map(({ area, amount, units }) => {
            const Icon = AREA_ICONS[area];
            const colorClass = AREA_COLORS[area];
            return (
              <div key={area} className={`flex items-center gap-3 p-3 rounded-xl border ${colorClass}`}>
                <div className="p-2 rounded-lg bg-white">
                  <Icon className={`w-4 h-4 ${colorClass.split(' ')[0]}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{IMPACT_RATES[area].label}</p>
                  <p className="text-xs text-gray-500">${amount.toLocaleString()} from your community</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-lg font-extrabold text-gray-900">{units}</p>
                  <p className="text-xs text-gray-500">reached</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Campaign breakdown */}
        {myCampaigns.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">By celebration</p>
            <div className="space-y-2">
              {myCampaigns.map((campaign) => {
                const total = getCampaignTotal(campaign.id, state.donations);
                const contributors = state.donations.filter((d) => d.campaignId === campaign.id).length;
                const units = getImpactUnits(campaign.impactArea, total);
                return (
                  <div key={campaign.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{campaign.name}</p>
                      <p className="text-xs text-gray-500">{contributors} contributors · {IMPACT_RATES[campaign.impactArea].label}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-base font-extrabold text-gray-900">{units}</p>
                      <p className="text-xs text-gray-500">reached</p>
                      <p className="text-xs text-gray-400">${total.toLocaleString()}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>}
    </div>
  );
}
