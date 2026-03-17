import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import EventBanner from '../components/event/EventBanner';
import DonateButton from '../components/event/DonateButton';
import DonateModal from '../components/event/DonateModal';
import DonorsList from '../components/event/DonorsList';
import EventImpactBreakdown from '../components/event/EventImpactBreakdown';
import CelebrationRecap from '../components/event/CelebrationRecap';
import ShareButtons from '../components/event/ShareButtons';
import NotFoundPage from './NotFoundPage';

export default function EventPage() {
  const { id } = useParams<{ id: string }>();
  const { state } = useAppContext();
  const [showDonateModal, setShowDonateModal] = useState(false);

  const campaign = state.campaigns.find((c) => c.id === id);
  if (!campaign) return <NotFoundPage />;

  const donations = state.donations.filter((d) => d.campaignId === campaign.id);
  const totalRaised = donations.reduce((sum, d) => sum + d.amount, 0);
  const contributorCount = donations.length;
  const hostFirstName = campaign.hostName.split(' ')[0];

  return (
    <div>
      <EventBanner campaign={campaign} totalRaised={totalRaised} contributorCount={contributorCount} />

      {/* Give CTA */}
      <div className="flex justify-center py-10 bg-white border-b border-gray-100">
        <DonateButton onClick={() => setShowDonateModal(true)} />
      </div>

      {/* Recap — the hero feature, visible to all */}
      <CelebrationRecap campaign={campaign} donations={donations} />

      {/* Message wall + impact side by side */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <DonorsList donations={donations} hostFirstName={hostFirstName} />
          <EventImpactBreakdown totalRaised={totalRaised} impactArea={campaign.impactArea} />
        </div>
        <div className="mt-10">
          <ShareButtons campaignName={campaign.name} />
        </div>
      </div>

      {showDonateModal && (
        <DonateModal
          campaign={campaign}
          onClose={() => setShowDonateModal(false)}
        />
      )}
    </div>
  );
}
