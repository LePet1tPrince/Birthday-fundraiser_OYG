import { useAppContext } from '../../hooks/useAppContext';
import { getCampaignTotal } from '../../data/mockData';
import CampaignCard from './CampaignCard';

export default function FeaturedCampaigns() {
  const { state } = useAppContext();

  return (
    <section className="py-20 bg-orange-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
          Featured Campaigns
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-14">
          See how others are turning their celebrations into meaningful impact.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {state.campaigns.slice(0, 3).map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              totalRaised={getCampaignTotal(campaign.id, state.donations)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
