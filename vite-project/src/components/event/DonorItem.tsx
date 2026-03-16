import type { Donation } from '../../types';
import { IMPACT_RATES } from '../../data/mockData';

interface DonorItemProps {
  donation: Donation;
}

export default function DonorItem({ donation }: DonorItemProps) {
  const initials = donation.donorName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 font-bold text-sm flex items-center justify-center shrink-0">
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-900 text-sm">{donation.donorName}</span>
          <span className="font-bold text-orange-600 text-sm">${donation.amount}</span>
        </div>
        {donation.message && (
          <p className="text-gray-500 text-xs mt-0.5 truncate">{donation.message}</p>
        )}
        <span className="text-xs text-gray-400">{IMPACT_RATES[donation.impactArea].label}</span>
      </div>
    </div>
  );
}
