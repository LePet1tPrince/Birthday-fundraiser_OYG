import { DollarSign, Users, Globe } from 'lucide-react';
import { useAppContext } from '../../hooks/useAppContext';
import AnimatedCounter from '../shared/AnimatedCounter';

export default function GlobalImpactStats() {
  const { state } = useAppContext();
  const { totalRaised, peopleReached, countriesReached } = state.globalStats;

  const stats = [
    { icon: DollarSign, label: 'Total Raised', value: totalRaised, prefix: '$' },
    { icon: Users, label: 'People Reached', value: peopleReached, suffix: '+' },
    { icon: Globe, label: 'Countries', value: countriesReached },
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Global Impact</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-14">
          Together, celebrations are changing lives around the world.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="w-14 h-14 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-7 h-7 text-orange-400" />
              </div>
              <AnimatedCounter
                end={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                className="text-4xl font-extrabold text-white"
              />
              <p className="text-gray-400 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
