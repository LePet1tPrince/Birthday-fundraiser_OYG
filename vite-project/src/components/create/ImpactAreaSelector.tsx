import { Shield, Zap, Package, Star } from 'lucide-react';
import type { ImpactArea } from '../../types';

const areas: { value: ImpactArea; label: string; icon: React.ElementType; description: string }[] = [
  { value: 'protect', label: 'Protect', icon: Shield, description: 'Help protect children from abuse and violence through prevention and healing programs.' },
  { value: 'respond', label: 'Respond', icon: Zap, description: 'Long-term programs in crisis zones, beyond emergency relief, in partnership with the World Food Program.' },
  { value: 'equip', label: 'Equip', icon: Package, description: 'Help families thrive with school supplies, clean water, health kits, and community training.' },
  { value: 'empower', label: 'Empower', icon: Star, description: 'Uplift women, girls, and communities through business training, savings groups, and leadership programs.' },
];

interface ImpactAreaSelectorProps {
  selected: ImpactArea | null;
  onChange: (area: ImpactArea) => void;
}

export default function ImpactAreaSelector({ selected, onChange }: ImpactAreaSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Choose a cause
      </label>
      <p className="text-xs text-gray-400 mb-3">Pick one — your guests will give directly to it.</p>
      <div className="grid grid-cols-2 gap-3">
        {areas.map(({ value, label, icon: Icon, description }) => {
          const isSelected = selected === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => onChange(value)}
              className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                isSelected
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 bg-white hover:border-orange-300'
              }`}
            >
              <div className={`p-2 rounded-lg shrink-0 ${isSelected ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className={`font-semibold text-sm ${isSelected ? 'text-orange-700' : 'text-gray-900'}`}>{label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
