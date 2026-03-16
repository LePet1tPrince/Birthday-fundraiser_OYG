import HeroSection from '../components/landing/HeroSection';
import HowItWorks from '../components/landing/HowItWorks';
import FeaturedCampaigns from '../components/landing/FeaturedCampaigns';
import GlobalImpactStats from '../components/landing/GlobalImpactStats';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <FeaturedCampaigns />
      <GlobalImpactStats />
    </>
  );
}
