import ImpactHero from '../components/impact/ImpactHero';
import CategoryBreakdown from '../components/impact/CategoryBreakdown';
import GeographicReach from '../components/impact/GeographicReach';
import ImpactTimeline from '../components/impact/ImpactTimeline';
import ShareImpactButtons from '../components/impact/ShareImpactButtons';

export default function ImpactDashboardPage() {
  return (
    <>
      <ImpactHero />
      <CategoryBreakdown />
      <GeographicReach />
      <ImpactTimeline />
      <ShareImpactButtons />
    </>
  );
}
