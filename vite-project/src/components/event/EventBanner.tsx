import { Calendar, User, Users } from 'lucide-react';
import type { Campaign } from '../../types';
import { IMPACT_RATES } from '../../data/mockData';
import ProgressBar from '../shared/ProgressBar';

const TYPE_LABELS: Record<string, string> = {
  birthday: 'Birthday Celebration',
  anniversary: 'Anniversary',
  memorial: 'In Memoriam',
  other: 'Celebration',
};

interface EventBannerProps {
  campaign: Campaign;
  totalRaised: number;
  contributorCount: number;
}

export default function EventBanner({ campaign, totalRaised, contributorCount }: EventBannerProps) {
  const rate = IMPACT_RATES[campaign.impactArea];

  return (
    <section className="bg-gradient-to-br from-orange-500 via-orange-400 to-amber-300 text-white">
      <div className="max-w-5xl mx-auto px-4 py-14 text-center">
        <span className="inline-block bg-white/20 backdrop-blur-sm text-sm font-semibold px-3 py-1 rounded-full mb-4">
          {TYPE_LABELS[campaign.eventType]} · {rate.label}
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
          <p className="text-white/90 max-w-2xl mx-auto mb-8 italic text-lg">&ldquo;{campaign.message}&rdquo;</p>
        )}
        <div className="max-w-md mx-auto bg-white rounded-xl p-5">
          {campaign.goalAmount ? (
            <ProgressBar current={totalRaised} goal={campaign.goalAmount} />
          ) : (
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-2xl font-extrabold text-gray-900">${totalRaised.toLocaleString()}</p>
                <p className="text-sm text-gray-500">given so far</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-extrabold text-orange-500 flex items-center gap-1 justify-end">
                  <Users className="w-5 h-5" />
                  {contributorCount}
                </p>
                <p className="text-sm text-gray-500">{contributorCount === 1 ? 'person' : 'people'} celebrating</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
