import type { Campaign, Donation, GlobalStats, ImpactArea, ImpactRate, User } from '../types';

export interface PersonalGift {
  id: string;
  label: string;
  impactArea: ImpactArea;
  amount: number;
  frequency: 'monthly' | 'one-time';
  date: string;
}

export const monthlySubscriptions: PersonalGift[] = [
  { id: 'sub-1', label: 'Protect — Monthly', impactArea: 'protect', amount: 35, frequency: 'monthly', date: '2026-03-01' },
  { id: 'sub-2', label: 'Protect — Monthly', impactArea: 'protect', amount: 35, frequency: 'monthly', date: '2026-02-01' },
  { id: 'sub-3', label: 'Protect — Monthly', impactArea: 'protect', amount: 35, frequency: 'monthly', date: '2026-01-01' },
  { id: 'sub-4', label: 'Respond — Monthly', impactArea: 'respond', amount: 25, frequency: 'monthly', date: '2026-03-01' },
  { id: 'sub-5', label: 'Respond — Monthly', impactArea: 'respond', amount: 25, frequency: 'monthly', date: '2026-02-01' },
  { id: 'sub-6', label: 'Respond — Monthly', impactArea: 'respond', amount: 25, frequency: 'monthly', date: '2026-01-01' },
];

export const oneTimeGifts: PersonalGift[] = [
  { id: 'gift-1', label: 'Empower — One-time', impactArea: 'empower', amount: 150, frequency: 'one-time', date: '2026-01-20' },
  { id: 'gift-2', label: 'Respond — Crisis Response', impactArea: 'respond', amount: 75, frequency: 'one-time', date: '2025-12-10' },
];

export const mockUser: User = {
  id: 'user-1',
  firstName: 'Timothy',
  lastName: 'Brooks',
  initials: 'TB',
  memberSince: 'August 2020',
  activeCampaignId: 'camp-1',
};

export const IMPACT_RATES: Record<ImpactArea, ImpactRate> = {
  protect: {
    label: 'Protect',
    costPerUnit: 20,
    unitLabel: 'people reached with Protect programming',
    icon: 'Shield',
    color: 'purple',
  },
  respond: {
    label: 'Respond',
    costPerUnit: 15,
    unitLabel: 'people reached with Respond programming',
    icon: 'Zap',
    color: 'red',
  },
  equip: {
    label: 'Equip',
    costPerUnit: 25,
    unitLabel: 'people reached with Equip programming',
    icon: 'Package',
    color: 'blue',
  },
  empower: {
    label: 'Empower',
    costPerUnit: 30,
    unitLabel: 'people reached with Empower programming',
    icon: 'Star',
    color: 'amber',
  },
};

export const sampleCampaigns: Campaign[] = [
  {
    id: 'camp-1',
    eventType: 'birthday',
    name: "Timothy's 40th Birthday",
    hostName: 'Timothy Brooks',
    date: '2026-04-20',
    goalAmount: 1000,
    message: "No gifts please — but if you want to do something for my 40th, let's help protect children from abuse and violence. That would mean everything.",
    impactArea: 'protect',
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'camp-2',
    eventType: 'birthday',
    name: "Marcus Turns 45",
    hostName: 'Marcus Williams',
    date: '2026-05-03',
    message: "Honestly, I don't need more stuff. If you're feeling generous, help me support communities in crisis instead. Best birthday gift I can imagine.",
    impactArea: 'respond',
    createdAt: '2026-02-20T14:30:00Z',
  },
  {
    id: 'camp-3',
    eventType: 'birthday',
    name: "Sofia's Big 5-0",
    hostName: 'Sofia Reyes',
    date: '2026-06-10',
    goalAmount: 2000,
    message: "Fifty years on this planet and the one thing I want is to help families thrive. No gifts — just join me in making that happen.",
    impactArea: 'equip',
    createdAt: '2026-01-20T09:00:00Z',
  },
];

export const sampleDonations: Donation[] = [
  // Emma's campaign
  { id: 'don-1', campaignId: 'camp-1', donorName: 'Michael Chen', amount: 100, message: 'Happy birthday, Emma! Best idea for a 30th ever.', createdAt: '2026-03-05T12:00:00Z' },
  { id: 'don-2', campaignId: 'camp-1', donorName: 'Sarah Williams', amount: 50, message: 'Cheers to 30! So proud of you for doing this.', createdAt: '2026-03-06T08:30:00Z' },
  { id: 'don-3', campaignId: 'camp-1', donorName: 'James Taylor', amount: 250, message: "This is the most Emma thing you've ever done. Love it.", createdAt: '2026-03-07T15:00:00Z' },
  { id: 'don-4', campaignId: 'camp-1', donorName: 'Lisa Anderson', amount: 75, message: 'Happy birthday! Here\'s to a meaningful year ahead.', createdAt: '2026-03-08T10:20:00Z' },
  { id: 'don-5', campaignId: 'camp-1', donorName: 'Robert Kim', amount: 100, message: 'Skipping the flowers and doing this instead. 🧡', createdAt: '2026-03-09T16:45:00Z' },
  { id: 'don-6', campaignId: 'camp-1', donorName: 'Emily Davis', amount: 50, message: 'Love this idea so much. Happy 30th!', createdAt: '2026-03-10T11:00:00Z' },

  // Marcus campaign
  { id: 'don-7', campaignId: 'camp-2', donorName: 'Ana Martinez', amount: 200, message: 'Happy birthday Marcus — this is such a great idea.', createdAt: '2026-03-01T09:00:00Z' },
  { id: 'don-8', campaignId: 'camp-2', donorName: 'Tom Wilson', amount: 150, message: 'Way better than a tie. Happy 45!', createdAt: '2026-03-02T13:30:00Z' },
  { id: 'don-9', campaignId: 'camp-2', donorName: 'Julia Roberts', amount: 100, message: 'You always were the thoughtful one. Congrats!', createdAt: '2026-03-03T11:15:00Z' },

  // Sofia campaign
  { id: 'don-10', campaignId: 'camp-3', donorName: 'Jennifer Park', amount: 500, message: 'Happy 50th Sofia! What an incredible way to celebrate.', createdAt: '2026-02-01T08:00:00Z' },
  { id: 'don-11', campaignId: 'camp-3', donorName: 'Kevin O\'Brien', amount: 200, message: 'You inspire everyone around you. Happy birthday.', createdAt: '2026-02-05T12:00:00Z' },
  { id: 'don-12', campaignId: 'camp-3', donorName: 'Michelle Torres', amount: 300, message: 'Fifty and fabulous — and changing the world while you\'re at it!', createdAt: '2026-02-10T09:30:00Z' },
];

export const initialGlobalStats: GlobalStats = {
  totalRaised: 128750,
  peopleReached: 4250,
  countriesReached: 10,
};

export function getCampaignTotal(campaignId: string, donations: Donation[]): number {
  return donations
    .filter((d) => d.campaignId === campaignId)
    .reduce((sum, d) => sum + d.amount, 0);
}

export function getCampaignContributors(campaignId: string, donations: Donation[]): number {
  return donations.filter((d) => d.campaignId === campaignId).length;
}

export function getImpactUnits(impactArea: ImpactArea, totalAmount: number): number {
  return Math.floor(totalAmount / IMPACT_RATES[impactArea].costPerUnit);
}

export function getAllDonationsTotal(donations: Donation[]): number {
  return donations.reduce((sum, d) => sum + d.amount, 0);
}
