import { useState } from 'react';
import { mockUser } from '../data/mockData';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import MyCelebrationTab from '../components/profile/MyCelebrationTab';
import MyImpactTab from '../components/profile/MyImpactTab';

type Tab = 'impact' | 'celebration';

const TAB_LABELS: Record<Tab, string> = {
  impact: 'My Impact',
  celebration: 'My Celebrations',
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>('impact');

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex gap-6 items-start">
      {/* Sidebar */}
      <ProfileSidebar />

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Greeting */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900">
            Hello, {mockUser.firstName}!
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Here's how your celebrations are making a difference.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit">
          {(Object.keys(TAB_LABELS) as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {TAB_LABELS[tab]}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'impact' && <MyImpactTab />}
        {activeTab === 'celebration' && <MyCelebrationTab />}
      </div>
    </div>
  );
}
