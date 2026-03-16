import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import EventBanner from '../components/event/EventBanner';
import DonateButton from '../components/event/DonateButton';
import DonateModal from '../components/event/DonateModal';
import DonorsList from '../components/event/DonorsList';
import EventImpactBreakdown from '../components/event/EventImpactBreakdown';
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

  return (
    <div>
      <EventBanner campaign={campaign} totalRaised={totalRaised} />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex justify-center mb-10">
          <DonateButton onClick={() => setShowDonateModal(true)} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <DonorsList donations={donations} />
          <EventImpactBreakdown donations={donations} impactAreas={campaign.impactAreas} />
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
