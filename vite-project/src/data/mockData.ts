import type { Campaign, Donation, GlobalStats, ImpactArea, ImpactRate } from '../types';

export const IMPACT_RATES: Record<ImpactArea, ImpactRate> = {
  water: {
    label: 'Clean Water',
    costPerUnit: 25,
    unitLabel: 'people provided with clean water',
    icon: 'Droplets',
    color: 'blue',
  },
  education: {
    label: 'Education',
    costPerUnit: 30,
    unitLabel: 'children educated for a month',
    icon: 'BookOpen',
    color: 'green',
  },
  health: {
    label: 'Healthcare',
    costPerUnit: 20,
    unitLabel: 'medical treatments provided',
    icon: 'Heart',
    color: 'red',
  },
  emergency: {
    label: 'Emergency Relief',
    costPerUnit: 15,
    unitLabel: 'emergency supply kits delivered',
    icon: 'ShieldAlert',
    color: 'amber',
  },
};

export const sampleCampaigns: Campaign[] = [
  {
    id: 'camp-1',
    eventType: 'birthday',
    name: "Emma's 30th Birthday",
    hostName: 'Emma Johnson',
    date: '2026-04-15',
    goalAmount: 1000,
    message: "No gifts please — but if you want to do something for my 30th, let's get clean water to communities who need it. That would mean everything.",
    impactArea: 'water',
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'camp-2',
    eventType: 'birthday',
    name: "Marcus Turns 45",
    hostName: 'Marcus Williams',
    date: '2026-05-03',
    message: "Honestly, I don't need more stuff. If you're feeling generous, help me support kids' education instead. Best birthday gift I can imagine.",
    impactArea: 'education',
    createdAt: '2026-02-20T14:30:00Z',
  },
  {
    id: 'camp-3',
    eventType: 'birthday',
    name: "Sofia's Big 5-0",
    hostName: 'Sofia Reyes',
    date: '2026-06-10',
    goalAmount: 2000,
    message: "Fifty years on this planet and the one thing I want is for more people to have access to healthcare. No gifts — just join me in making that happen.",
    impactArea: 'health',
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
