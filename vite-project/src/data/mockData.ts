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

export const sampleCampaigns: Campaign[] = [];

export const sampleDonations: Donation[] = [];

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
