import { DollarSign, Users, Globe } from 'lucide-react';
import { useAppContext } from '../../hooks/useAppContext';
import AnimatedCounter from '../shared/AnimatedCounter';

export default function ImpactHero() {
  const { state } = useAppContext();
  const { totalRaised, peopleReached, countriesReached } = state.globalStats;

  const stats = [
    { icon: DollarSign, label: 'Total Raised', value: totalRaised, prefix: '$' },
    { icon: Users, label: 'Lives Impacted', value: peopleReached, suffix: '+' },
    { icon: Globe, label: 'Countries Reached', value: countriesReached },
  ];

  return (
    <section className="bg-gradient-to-br from-orange-500 via-orange-400 to-amber-300 text-white py-16">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">Impact Dashboard</h1>
        <p className="text-white/80 mb-12 text-lg">Every donation tells a story of change.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white/15 backdrop-blur-sm rounded-xl p-6">
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-white/80" />
              <AnimatedCounter
                end={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                className="text-3xl font-extrabold block"
              />
              <p className="text-white/70 mt-1 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
