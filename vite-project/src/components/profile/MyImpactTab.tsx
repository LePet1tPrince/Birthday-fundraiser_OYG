import { Droplets, BookOpen, Heart, ShieldAlert, TrendingUp } from 'lucide-react';
import { useAppContext } from '../../hooks/useAppContext';
import { mockUser, IMPACT_RATES, getCampaignTotal } from '../../data/mockData';
import type { ImpactArea } from '../../types';
import AnimatedCounter from '../shared/AnimatedCounter';

const AREA_ICONS: Record<ImpactArea, React.ElementType> = {
  water: Droplets,
  education: BookOpen,
  health: Heart,
  emergency: ShieldAlert,
};

const AREA_COLORS: Record<ImpactArea, string> = {
  water: 'text-blue-500 bg-blue-50 border-blue-100',
  education: 'text-green-500 bg-green-50 border-green-100',
  health: 'text-red-500 bg-red-50 border-red-100',
  emergency: 'text-amber-500 bg-amber-50 border-amber-100',
};

export default function MyImpactTab() {
  const { state } = useAppContext();

  const myCampaigns = mockUser.activeCampaignId
    ? state.campaigns.filter((c) => c.hostName === 'Timothy Brooks')
    : [];

  const allDonations = state.donations.filter((d) =>
    myCampaigns.some((c) => c.id === d.campaignId)
  );

  const totalGiven = allDonations.reduce((sum, d) => sum + d.amount, 0);
  const totalContributors = allDonations.length;

  // Group impact by cause area across all my campaigns
  const impactByCause = myCampaigns.reduce<Record<ImpactArea, { amount: number; units: number }>>((acc, campaign) => {
    const campaignTotal = getCampaignTotal(campaign.id, state.donations);
    const area = campaign.impactArea;
    const units = Math.floor(campaignTotal / IMPACT_RATES[area].costPerUnit);
    if (!acc[area]) {
      acc[area] = { amount: 0, units: 0 };
    }
    acc[area].amount += campaignTotal;
    acc[area].units += units;
    return acc;
  }, {} as Record<ImpactArea, { amount: number; units: number }>);

  return (
    <div className="space-y-6">
      {/* Headline stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-2">Total given</p>
          <p className="text-3xl font-extrabold text-gray-900">
            $<AnimatedCounter end={totalGiven} />
          </p>
          <p className="text-sm text-gray-500 mt-1">across all celebrations</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-2">Friends who joined</p>
          <p className="text-3xl font-extrabold text-gray-900">
            <AnimatedCounter end={totalContributors} />
          </p>
          <p className="text-sm text-gray-500 mt-1">people celebrated with you</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-amber-400 rounded-2xl p-5 text-white">
          <p className="text-xs text-white/70 font-semibold uppercase tracking-wide mb-2">Celebrations created</p>
          <p className="text-3xl font-extrabold">
            <AnimatedCounter end={myCampaigns.length} />
          </p>
          <p className="text-sm text-white/80 mt-1">milestone{myCampaigns.length !== 1 ? 's' : ''} turned into impact</p>
        </div>
      </div>

      {/* Impact by cause */}
      {Object.keys(impactByCause).length > 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            <h3 className="font-bold text-gray-900">Your impact by cause</h3>
          </div>
          <div className="space-y-4">
            {(Object.entries(impactByCause) as [ImpactArea, { amount: number; units: number }][]).map(([area, data]) => {
              const Icon = AREA_ICONS[area];
              const colorClass = AREA_COLORS[area];
              const rate = IMPACT_RATES[area];
              return (
                <div key={area} className={`flex items-center gap-4 p-4 rounded-xl border ${colorClass}`}>
                  <div className={`p-2.5 rounded-xl bg-white`}>
                    <Icon className={`w-5 h-5 ${colorClass.split(' ')[0]}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{rate.label}</p>
                    <p className="text-sm text-gray-500">${data.amount.toLocaleString()} contributed</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-extrabold text-gray-900">{data.units.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{rate.unitLabel}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-10 text-center text-gray-400">
          <p className="text-sm">Create a celebration page to start building your impact story.</p>
        </div>
      )}

      {/* Timeline of celebrations */}
      {myCampaigns.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Your celebrations</h3>
          <div className="space-y-3">
            {myCampaigns.map((campaign) => {
              const total = getCampaignTotal(campaign.id, state.donations);
              const contributors = state.donations.filter((d) => d.campaignId === campaign.id).length;
              const units = Math.floor(total / IMPACT_RATES[campaign.impactArea].costPerUnit);
              return (
                <div key={campaign.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    {(() => { const Icon = AREA_ICONS[campaign.impactArea]; return <Icon className="w-5 h-5" />; })()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{campaign.name}</p>
                    <p className="text-xs text-gray-500">{IMPACT_RATES[campaign.impactArea].label} · {contributors} contributors</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-gray-900 text-sm">${total.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{units} {IMPACT_RATES[campaign.impactArea].unitLabel.split(' ').slice(0, 2).join(' ')}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
