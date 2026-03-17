import type { Donation } from '../../types';
import DonorItem from './DonorItem';

interface DonorsListProps {
  donations: Donation[];
  hostFirstName: string;
}

export default function DonorsList({ donations, hostFirstName }: DonorsListProps) {
  const sorted = [...donations].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-1">
        Notes for {hostFirstName}
      </h2>
      <p className="text-sm text-gray-500 mb-4">{donations.length} {donations.length === 1 ? 'person' : 'people'} celebrating with you</p>
      {sorted.length === 0 ? (
        <div className="bg-gray-50 border border-dashed border-gray-200 rounded-xl p-6 text-center text-gray-400">
          <p className="text-sm">No notes yet — be the first to celebrate!</p>
        </div>
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
