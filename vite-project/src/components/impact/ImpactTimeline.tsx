import { useAppContext } from '../../hooks/useAppContext';
import { IMPACT_RATES } from '../../data/mockData';

export default function ImpactTimeline() {
  const { state } = useAppContext();

  const recentDonations = [...state.donations]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-10">
          Recent Activity
        </h2>
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-orange-200" />
          <div className="space-y-6">
            {recentDonations.map((donation) => {
              const campaign = state.campaigns.find((c) => c.id === donation.campaignId);
              return (
                <div key={donation.id} className="relative flex gap-4 pl-12">
                  <div className="absolute left-3.5 top-1 w-3 h-3 rounded-full bg-orange-500 border-2 border-white" />
                  <div className="flex-1 bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-900 text-sm">{donation.donorName}</span>
                      <span className="font-bold text-orange-600 text-sm">${donation.amount}</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Donated to <span className="font-medium">{campaign?.name ?? 'a campaign'}</span>
                      {' '}&middot; {IMPACT_RATES[donation.impactArea].label}
                    </p>
                    {donation.message && (
                      <p className="text-xs text-gray-400 mt-1 italic">&ldquo;{donation.message}&rdquo;</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
