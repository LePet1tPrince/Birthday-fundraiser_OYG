import type { Donation } from '../../types';

interface DonorItemProps {
  donation: Donation;
}

export default function DonorItem({ donation }: DonorItemProps) {
  const displayName = donation.anonymizeName ? 'Anonymous' : donation.donorName;
  const initials = donation.anonymizeName
    ? '?'
    : donation.donorName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="flex items-start gap-3 py-4 border-b border-gray-100 last:border-0">
      <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 font-bold text-sm flex items-center justify-center shrink-0">
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-900 text-sm">{displayName}</span>
          <span className="text-xs text-gray-400 shrink-0">
            {donation.anonymizeAmount ? 'Gift hidden' : `$${donation.amount}`}
          </span>
        </div>
        {donation.message ? (
          <p className="text-gray-600 text-sm mt-1 leading-snug">{donation.message}</p>
        ) : (
          <p className="text-gray-400 text-xs mt-1 italic">No note left</p>
        )}
      </div>
    </div>
  );
}
