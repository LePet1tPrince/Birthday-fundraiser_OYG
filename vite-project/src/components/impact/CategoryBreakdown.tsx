import { useAppContext } from '../../hooks/useAppContext';
import { IMPACT_RATES } from '../../data/mockData';
import ImpactCard from '../shared/ImpactCard';
import type { ImpactArea } from '../../types';

const AREAS: ImpactArea[] = ['water', 'education', 'health', 'emergency'];

export default function CategoryBreakdown() {
  const { state } = useAppContext();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-10">
          Impact by Cause
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AREAS.map((area) => {
            const campaignsForArea = state.campaigns.filter((c) => c.impactArea === area);
            const campaignIds = new Set(campaignsForArea.map((c) => c.id));
            const amount = state.donations
              .filter((d) => campaignIds.has(d.campaignId))
              .reduce((sum, d) => sum + d.amount, 0);
            const units = Math.floor(amount / IMPACT_RATES[area].costPerUnit);
            return <ImpactCard key={area} area={area} amount={amount} units={units} />;
          })}
        </div>
      </div>
    </section>
  );
}
