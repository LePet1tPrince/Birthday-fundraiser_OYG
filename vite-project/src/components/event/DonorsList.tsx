import type { Donation } from '../../types';
import DonorItem from './DonorItem';

interface DonorsListProps {
  donations: Donation[];
}

export default function DonorsList({ donations }: DonorsListProps) {
  const sorted = [...donations].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Recent Donors <span className="text-gray-400 font-normal text-base">({donations.length})</span>
      </h2>
      {sorted.length === 0 ? (
        <p className="text-gray-500">No donations yet. Be the first!</p>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-4 max-h-[400px] overflow-y-auto">
          {sorted.map((d) => (
            <DonorItem key={d.id} donation={d} />
          ))}
        </div>
      )}
    </div>
  );
}
