import { Cake, BarChart3, Gift, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { User } from '../../types';
import { mockUser, getCampaignTotal, getCampaignContributors, getImpactUnits } from '../../data/mockData';
import { useAppContext } from '../../hooks/useAppContext';

type Tab = 'celebration' | 'impact' | 'give';

const navItems: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'celebration', label: 'My Celebration', icon: Cake },
  { id: 'impact', label: 'My Impact', icon: BarChart3 },
  { id: 'give', label: 'Give a Gift', icon: Gift },
];

interface ProfileSidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function ProfileSidebar({ activeTab, onTabChange }: ProfileSidebarProps) {
  const { state } = useAppContext();
  const user: User = mockUser;

  const campaign = user.activeCampaignId
    ? state.campaigns.find((c) => c.id === user.activeCampaignId)
    : null;

  const totalGiven = state.donations
    .filter((d) => state.campaigns.some((c) => c.id === d.campaignId))
    .reduce((sum, d) => sum + d.amount, 0);

  const campaignDonations = campaign
    ? state.donations.filter((d) => d.campaignId === campaign.id)
    : [];
  const campaignTotal = campaignDonations.reduce((sum, d) => sum + d.amount, 0);
  const impactUnits = campaign ? getImpactUnits(campaign.impactArea, campaignTotal) : 0;

  return (
    <aside className="w-64 shrink-0 flex flex-col">
      {/* User card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
        <div className="flex flex-col items-center text-center mb-5">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 text-white font-extrabold text-xl flex items-center justify-center mb-3 shadow-sm">
            {user.initials}
          </div>
          <p className="font-bold text-gray-900 text-lg leading-tight">{user.firstName} {user.lastName}</p>
          <p className="text-xs text-gray-400 mt-1">Member since {user.memberSince}</p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-orange-50 rounded-xl p-3 text-center">
            <p className="text-xl font-extrabold text-orange-600">${totalGiven.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-0.5">Total given</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-3 text-center">
            <p className="text-xl font-extrabold text-orange-600">{impactUnits}</p>
            <p className="text-xs text-gray-500 mt-0.5">People reached</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="bg-white rounded-2xl border border-gray-200 p-3 mb-4">
        <nav className="space-y-1">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-colors ${
                activeTab === id
                  ? 'bg-orange-50 text-orange-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${activeTab === id ? 'text-orange-500' : 'text-gray-400'}`} />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Active celebration mini card */}
      {campaign && (
        <div className="bg-gradient-to-br from-orange-500 to-amber-400 rounded-2xl p-4 text-white">
          <p className="text-xs font-bold uppercase tracking-wide text-white/70 mb-1">Active page</p>
          <p className="font-bold text-sm leading-snug mb-2">{campaign.name}</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-extrabold">${campaignTotal.toLocaleString()}</p>
              <p className="text-xs text-white/70">{getCampaignContributors(campaign.id, state.donations)} celebrating</p>
            </div>
            <Link
              to={`/event/${campaign.id}`}
              target="_blank"
              className="flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors no-underline"
            >
              View public page <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}
    </aside>
  );
}
