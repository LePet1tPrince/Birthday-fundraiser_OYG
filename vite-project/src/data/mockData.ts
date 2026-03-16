import type { Campaign, Donation, GlobalStats, ImpactArea, ImpactRate } from '../types';

export const IMPACT_RATES: Record<ImpactArea, ImpactRate> = {
  water: {
    label: 'Clean Water',
    costPerUnit: 25,
    unitLabel: 'people with clean water',
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
    unitLabel: 'emergency supply kits',
    icon: 'ShieldAlert',
    color: 'amber',
  },
};

export const COUNTRIES = [
  'Kenya', 'Uganda', 'Tanzania', 'India', 'Bangladesh',
  'Guatemala', 'Haiti', 'Philippines', 'Cambodia', 'Nepal',
];

export const sampleCampaigns: Campaign[] = [
  {
    id: 'camp-1',
    eventType: 'birthday',
    name: "Emma's 30th Birthday",
    hostName: 'Emma Johnson',
    date: '2026-04-15',
    goalAmount: 2000,
    message: "Instead of gifts, I'd love for my friends and family to help provide clean water to communities in need. Let's make my 30th count!",
    impactAreas: ['water', 'education'],
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'camp-2',
    eventType: 'anniversary',
    name: "The Garcias' 25th Anniversary",
    hostName: 'Maria & Carlos Garcia',
    date: '2026-05-20',
    goalAmount: 5000,
    message: "25 years of love! We're celebrating by giving back. Join us in supporting healthcare and education for children around the world.",
    impactAreas: ['health', 'education'],
    createdAt: '2026-02-15T14:30:00Z',
  },
  {
    id: 'camp-3',
    eventType: 'memorial',
    name: "In Memory of David Park",
    hostName: 'Sarah Park',
    date: '2026-06-10',
    goalAmount: 10000,
    message: "David believed every child deserves a chance. Honor his legacy by supporting emergency relief and clean water initiatives.",
    impactAreas: ['emergency', 'water'],
    createdAt: '2026-01-20T09:00:00Z',
  },
];

export const sampleDonations: Donation[] = [
  // Emma's campaign
  { id: 'don-1', campaignId: 'camp-1', donorName: 'Michael Chen', amount: 100, message: 'Happy birthday, Emma! Great cause.', impactArea: 'water', createdAt: '2026-03-05T12:00:00Z' },
  { id: 'don-2', campaignId: 'camp-1', donorName: 'Sarah Williams', amount: 50, message: 'Cheers to 30!', impactArea: 'education', createdAt: '2026-03-06T08:30:00Z' },
  { id: 'don-3', campaignId: 'camp-1', donorName: 'James Taylor', amount: 250, message: 'Amazing initiative!', impactArea: 'water', createdAt: '2026-03-07T15:00:00Z' },
  { id: 'don-4', campaignId: 'camp-1', donorName: 'Lisa Anderson', amount: 75, message: 'Happy birthday!', impactArea: 'water', createdAt: '2026-03-08T10:20:00Z' },
  { id: 'don-5', campaignId: 'camp-1', donorName: 'Robert Kim', amount: 100, message: 'For a great cause', impactArea: 'education', createdAt: '2026-03-09T16:45:00Z' },
  { id: 'don-6', campaignId: 'camp-1', donorName: 'Emily Davis', amount: 50, message: 'Love this idea!', impactArea: 'water', createdAt: '2026-03-10T11:00:00Z' },

  // Garcia campaign
  { id: 'don-7', campaignId: 'camp-2', donorName: 'Ana Martinez', amount: 200, message: 'Congratulations on 25 years!', impactArea: 'health', createdAt: '2026-03-01T09:00:00Z' },
  { id: 'don-8', campaignId: 'camp-2', donorName: 'Tom Wilson', amount: 150, message: 'Happy anniversary!', impactArea: 'education', createdAt: '2026-03-02T13:30:00Z' },
  { id: 'don-9', campaignId: 'camp-2', donorName: 'Julia Roberts', amount: 100, message: 'Beautiful cause!', impactArea: 'health', createdAt: '2026-03-03T11:15:00Z' },
  { id: 'don-10', campaignId: 'camp-2', donorName: 'David Lee', amount: 500, message: 'Here\'s to 25 more!', impactArea: 'education', createdAt: '2026-03-04T14:00:00Z' },
  { id: 'don-11', campaignId: 'camp-2', donorName: 'Carmen Diaz', amount: 75, message: 'Felicidades!', impactArea: 'health', createdAt: '2026-03-05T10:30:00Z' },
  { id: 'don-12', campaignId: 'camp-2', donorName: 'Peter Zhang', amount: 250, message: 'Wonderful initiative', impactArea: 'education', createdAt: '2026-03-06T16:00:00Z' },

  // Park memorial
  { id: 'don-13', campaignId: 'camp-3', donorName: 'Jennifer Park', amount: 500, message: 'In loving memory of David.', impactArea: 'emergency', createdAt: '2026-02-01T08:00:00Z' },
  { id: 'don-14', campaignId: 'camp-3', donorName: 'Kevin O\'Brien', amount: 200, message: 'David was an amazing person.', impactArea: 'water', createdAt: '2026-02-05T12:00:00Z' },
  { id: 'don-15', campaignId: 'camp-3', donorName: 'Michelle Torres', amount: 1000, message: 'For David\'s legacy', impactArea: 'emergency', createdAt: '2026-02-10T09:30:00Z' },
  { id: 'don-16', campaignId: 'camp-3', donorName: 'Daniel Nakamura', amount: 150, message: 'Thinking of you, Sarah', impactArea: 'water', createdAt: '2026-02-15T14:00:00Z' },
  { id: 'don-17', campaignId: 'camp-3', donorName: 'Grace Liu', amount: 300, message: 'David\'s spirit lives on', impactArea: 'emergency', createdAt: '2026-02-20T11:45:00Z' },
  { id: 'don-18', campaignId: 'camp-3', donorName: 'Alex Patel', amount: 250, message: 'A wonderful tribute', impactArea: 'water', createdAt: '2026-02-25T16:30:00Z' },
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

export function getImpactForArea(area: ImpactArea, donations: Donation[]): number {
  const total = donations
    .filter((d) => d.impactArea === area)
    .reduce((sum, d) => sum + d.amount, 0);
  return Math.floor(total / IMPACT_RATES[area].costPerUnit);
}

export function getAllDonationsTotal(donations: Donation[]): number {
  return donations.reduce((sum, d) => sum + d.amount, 0);
}
