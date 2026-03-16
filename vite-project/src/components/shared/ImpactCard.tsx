import { Droplets, BookOpen, Heart, ShieldAlert } from 'lucide-react';
import type { ImpactArea } from '../../types';
import { IMPACT_RATES } from '../../data/mockData';

const ICONS: Record<ImpactArea, React.ElementType> = {
  water: Droplets,
  education: BookOpen,
  health: Heart,
  emergency: ShieldAlert,
};

const COLOR_MAP: Record<ImpactArea, { bg: string; icon: string; border: string }> = {
  water: { bg: 'bg-blue-50', icon: 'text-blue-500', border: 'border-blue-200' },
  education: { bg: 'bg-green-50', icon: 'text-green-500', border: 'border-green-200' },
  health: { bg: 'bg-red-50', icon: 'text-red-500', border: 'border-red-200' },
  emergency: { bg: 'bg-amber-50', icon: 'text-amber-500', border: 'border-amber-200' },
};

interface ImpactCardProps {
  area: ImpactArea;
  amount: number;
  units: number;
  className?: string;
}

export default function ImpactCard({ area, amount, units, className = '' }: ImpactCardProps) {
  const rate = IMPACT_RATES[area];
  const Icon = ICONS[area];
  const colors = COLOR_MAP[area];

  return (
    <div className={`rounded-xl border ${colors.border} ${colors.bg} p-5 ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg bg-white ${colors.icon}`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="font-semibold text-gray-900">{rate.label}</h3>
      </div>
      <p className="text-2xl font-bold text-gray-900">{units.toLocaleString()}</p>
      <p className="text-sm text-gray-600">{rate.unitLabel}</p>
      <p className="text-xs text-gray-400 mt-2">${amount.toLocaleString()} contributed</p>
    </div>
  );
}
