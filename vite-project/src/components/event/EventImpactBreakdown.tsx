import type { ImpactArea } from '../../types';
import { IMPACT_RATES } from '../../data/mockData';
import ImpactCard from '../shared/ImpactCard';

interface EventImpactBreakdownProps {
  totalRaised: number;
  impactArea: ImpactArea;
}

export default function EventImpactBreakdown({ totalRaised, impactArea }: EventImpactBreakdownProps) {
  const units = Math.floor(totalRaised / IMPACT_RATES[impactArea].costPerUnit);

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-1">Impact So Far</h2>
      <p className="text-sm text-gray-500 mb-4">Every contribution goes directly to this cause.</p>
      <ImpactCard area={impactArea} amount={totalRaised} units={units} />
    </div>
  );
}
