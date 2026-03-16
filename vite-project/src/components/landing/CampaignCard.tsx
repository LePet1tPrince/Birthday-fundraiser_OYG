import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import type { Campaign } from '../../types';
import ProgressBar from '../shared/ProgressBar';

interface CampaignCardProps {
  campaign: Campaign;
  totalRaised: number;
}

const TYPE_LABELS: Record<string, string> = {
  birthday: 'Birthday',
  anniversary: 'Anniversary',
  memorial: 'Memorial',
  other: 'Event',
};

export default function CampaignCard({ campaign, totalRaised }: CampaignCardProps) {
  return (
    <Link
      to={`/event/${campaign.id}`}
      className="block bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow overflow-hidden no-underline group"
    >
      <div className="bg-gradient-to-r from-orange-400 to-amber-300 h-2" />
      <div className="p-6">
        <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
          {TYPE_LABELS[campaign.eventType]}
        </span>
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors mb-2">
          {campaign.name}
        </h3>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            {campaign.hostName}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(campaign.date).toLocaleDateString()}
          </span>
        </div>
        <ProgressBar current={totalRaised} goal={campaign.goalAmount} />
      </div>
    </Link>
  );
}
