import { Link } from 'react-router-dom';
import { Calendar, User, Users } from 'lucide-react';
import type { Campaign } from '../../types';
import { IMPACT_RATES } from '../../data/mockData';
import ProgressBar from '../shared/ProgressBar';

interface CampaignCardProps {
  campaign: Campaign;
  totalRaised: number;
  contributorCount: number;
}

const TYPE_LABELS: Record<string, string> = {
  birthday: 'Birthday',
  anniversary: 'Anniversary',
  memorial: 'Memorial',
  other: 'Event',
};

export default function CampaignCard({ campaign, totalRaised, contributorCount }: CampaignCardProps) {
  const rate = IMPACT_RATES[campaign.impactArea];

  return (
    <Link
      to={`/event/${campaign.id}`}
      className="block bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow overflow-hidden no-underline group"
    >
      <div className="bg-gradient-to-r from-orange-400 to-amber-300 h-2" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-2.5 py-1 rounded-full">
            {TYPE_LABELS[campaign.eventType]}
          </span>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">{rate.label}</span>
        </div>
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
        {campaign.goalAmount ? (
          <ProgressBar current={totalRaised} goal={campaign.goalAmount} />
        ) : (
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-gray-900">${totalRaised.toLocaleString()} given</span>
            <span className="flex items-center gap-1 text-gray-500">
              <Users className="w-3.5 h-3.5" />
              {contributorCount} {contributorCount === 1 ? 'person' : 'people'}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
