import { Shield, Zap, Package, Star, Users, Sparkles } from 'lucide-react';
import type { Campaign, Donation, ImpactArea } from '../../types';
import { IMPACT_RATES, getImpactUnits } from '../../data/mockData';
import AnimatedCounter from '../shared/AnimatedCounter';

const AREA_ICONS: Record<ImpactArea, React.ElementType> = {
  protect: Shield,
  respond: Zap,
  equip: Package,
  empower: Star,
};

const IMPACT_STORY: Record<ImpactArea, (units: number, firstName: string) => string> = {
  protect: (units, name) =>
    units >= 1
      ? `${name}'s birthday reached ${units} ${units === 1 ? 'person' : 'people'} with Protect programming. That's what skipping the gifts looks like.`
      : `Every dollar goes toward protecting children from abuse and violence.`,
  respond: (units, name) =>
    units >= 1
      ? `Together, you reached ${units} ${units === 1 ? 'person' : 'people'} with Respond programming — all because ${name} said "no gifts please."`
      : `Every dollar supports long-term recovery in crisis zones.`,
  equip: (units, name) =>
    units >= 1
      ? `${name}'s crew reached ${units} ${units === 1 ? 'person' : 'people'} with Equip programming. That's the power of a group showing up together.`
      : `Every dollar helps families thrive with tools and training.`,
  empower: (units, name) =>
    units >= 1
      ? `${units} ${units === 1 ? 'person' : 'people'} reached with Empower programming — because ${name}'s friends chose impact over stuff.`
      : `Every dollar uplifts women, girls, and communities.`,
};

interface CelebrationRecapProps {
  campaign: Campaign;
  donations: Donation[];
}

export default function CelebrationRecap({ campaign, donations }: CelebrationRecapProps) {
  const totalRaised = donations.reduce((sum, d) => sum + d.amount, 0);
  const contributorCount = donations.length;
  const rate = IMPACT_RATES[campaign.impactArea];
  const ImpactIcon = AREA_ICONS[campaign.impactArea];
  const impactUnits = getImpactUnits(campaign.impactArea, totalRaised);
  const firstName = campaign.hostName.split(' ')[0];

  if (contributorCount === 0) {
    return (
      <section className="bg-orange-50 border-y border-orange-100 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Sparkles className="w-8 h-8 text-orange-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Your recap will live here</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Once people start celebrating with you, this section will show your shared impact — total raised, how many people joined, and exactly how many people you reached together.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-orange-500 via-orange-400 to-amber-300 text-white py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-2">Celebration Recap</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
          {firstName}'s crew showed up.
        </h2>
        <p className="text-white/85 text-lg mb-12 max-w-xl mx-auto">
          {contributorCount} {contributorCount === 1 ? 'person' : 'people'} celebrated {firstName} by giving to {rate.label} instead of buying a gift.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6">
            <p className="text-white/70 text-xs font-semibold uppercase tracking-wide mb-2">Total given</p>
            <p className="text-5xl font-extrabold mb-1">
              $<AnimatedCounter end={totalRaised} />
            </p>
            <p className="text-white/70 text-sm">raised together</p>
          </div>

          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6">
            <p className="text-white/70 text-xs font-semibold uppercase tracking-wide mb-2">Group size</p>
            <p className="text-5xl font-extrabold mb-1 flex items-center justify-center gap-2">
              <Users className="w-8 h-8 opacity-80" />
              <AnimatedCounter end={contributorCount} />
            </p>
            <p className="text-white/70 text-sm">{contributorCount === 1 ? 'person celebrated' : 'people celebrated'} with you</p>
          </div>

          <div className="bg-white/25 backdrop-blur-sm rounded-2xl p-6 ring-2 ring-white/50">
            <p className="text-white/70 text-xs font-semibold uppercase tracking-wide mb-2">People reached</p>
            <p className="text-5xl font-extrabold mb-1 flex items-center justify-center gap-2">
              <ImpactIcon className="w-8 h-8 opacity-80" />
              <AnimatedCounter end={impactUnits} />
            </p>
            <p className="text-white/80 text-sm font-medium">with {rate.label} programming</p>
          </div>
        </div>

        {/* Impact story */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
          <ImpactIcon className="w-6 h-6 mx-auto mb-3 opacity-80" />
          <p className="text-lg sm:text-xl font-semibold leading-relaxed">
            &ldquo;{IMPACT_STORY[campaign.impactArea](impactUnits, firstName)}&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
