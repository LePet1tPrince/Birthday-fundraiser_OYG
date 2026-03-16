import { Calendar, User } from 'lucide-react';
import type { Campaign } from '../../types';
import ProgressBar from '../shared/ProgressBar';

const TYPE_LABELS: Record<string, string> = {
  birthday: 'Birthday',
  anniversary: 'Anniversary',
  memorial: 'Memorial',
  other: 'Event',
};

interface EventBannerProps {
  campaign: Campaign;
  totalRaised: number;
}

export default function EventBanner({ campaign, totalRaised }: EventBannerProps) {
  return (
    <section className="bg-gradient-to-br from-orange-500 via-orange-400 to-amber-300 text-white">
      <div className="max-w-5xl mx-auto px-4 py-14 text-center">
        <span className="inline-block bg-white/20 backdrop-blur-sm text-sm font-semibold px-3 py-1 rounded-full mb-4">
          {TYPE_LABELS[campaign.eventType]}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">{campaign.name}</h1>
        <div className="flex items-center justify-center gap-4 text-white/80 text-sm mb-6">
          <span className="flex items-center gap-1">
            <User className="w-4 h-4" />
            {campaign.hostName}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(campaign.date).toLocaleDateString()}
          </span>
        </div>
        {campaign.message && (
          <p className="text-white/90 max-w-2xl mx-auto mb-8 italic">&ldquo;{campaign.message}&rdquo;</p>
        )}
        <div className="max-w-md mx-auto bg-white rounded-xl p-5">
          <ProgressBar current={totalRaised} goal={campaign.goalAmount} />
        </div>
      </div>
    </section>
  );
}
