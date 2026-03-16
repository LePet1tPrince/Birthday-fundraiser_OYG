import { Droplets, BookOpen, Heart, ShieldAlert } from 'lucide-react';
import type { ImpactArea } from '../../types';

const areas: { value: ImpactArea; label: string; icon: React.ElementType; description: string }[] = [
  { value: 'water', label: 'Clean Water', icon: Droplets, description: 'Provide safe drinking water' },
  { value: 'education', label: 'Education', icon: BookOpen, description: 'Fund schooling for children' },
  { value: 'health', label: 'Healthcare', icon: Heart, description: 'Support medical treatment' },
  { value: 'emergency', label: 'Emergency Relief', icon: ShieldAlert, description: 'Deliver emergency supplies' },
];

interface ImpactAreaSelectorProps {
  selected: ImpactArea[];
  onChange: (areas: ImpactArea[]) => void;
}

export default function ImpactAreaSelector({ selected, onChange }: ImpactAreaSelectorProps) {
  const toggle = (area: ImpactArea) => {
    if (selected.includes(area)) {
      onChange(selected.filter((a) => a !== area));
    } else {
      onChange([...selected, area]);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Impact Areas <span className="text-gray-400">(select one or more)</span>
      </label>
      <div className="grid grid-cols-2 gap-3">
        {areas.map(({ value, label, icon: Icon, description }) => {
          const isSelected = selected.includes(value);
          return (
            <button
              key={value}
              type="button"
              onClick={() => toggle(value)}
              className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                isSelected
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 bg-white hover:border-orange-300'
              }`}
            >
              <div className={`p-2 rounded-lg ${isSelected ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className={`font-semibold text-sm ${isSelected ? 'text-orange-700' : 'text-gray-900'}`}>{label}</p>
                <p className="text-xs text-gray-500">{description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
