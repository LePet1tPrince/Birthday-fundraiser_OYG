import type { Donation, ImpactArea } from '../../types';
import { IMPACT_RATES } from '../../data/mockData';
import ImpactCard from '../shared/ImpactCard';

interface EventImpactBreakdownProps {
  donations: Donation[];
  impactAreas: ImpactArea[];
}

export default function EventImpactBreakdown({ donations, impactAreas }: EventImpactBreakdownProps) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Your Impact</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {impactAreas.map((area) => {
          const areaDonations = donations.filter((d) => d.impactArea === area);
          const amount = areaDonations.reduce((sum, d) => sum + d.amount, 0);
          const units = Math.floor(amount / IMPACT_RATES[area].costPerUnit);
          return (
            <ImpactCard key={area} area={area} amount={amount} units={units} />
          );
        })}
      </div>
    </div>
  );
}
