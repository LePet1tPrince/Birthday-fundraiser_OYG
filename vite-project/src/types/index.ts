export type EventType = 'birthday' | 'anniversary' | 'memorial' | 'other';
export type ImpactArea = 'protect' | 'respond' | 'equip' | 'empower';

export interface Campaign {
  id: string;
  eventType: EventType;
  name: string;
  hostName: string;
  date: string;
  goalAmount?: number;
  message: string;
  impactArea: ImpactArea;
  createdAt: string;
}

export interface Donation {
  id: string;
  campaignId: string;
  donorName: string;
  amount: number;
  message: string;
  createdAt: string;
  anonymizeName?: boolean;
  anonymizeAmount?: boolean;
}

export interface Notification {
  id: string;
  type: 'success' | 'info';
  message: string;
}

export interface GlobalStats {
  totalRaised: number;
  peopleReached: number;
  countriesReached: number;
}

export interface ImpactRate {
  label: string;
  costPerUnit: number;
  unitLabel: string;
  icon: string;
  color: string;
}

export interface AppState {
  campaigns: Campaign[];
  donations: Donation[];
  notifications: Notification[];
  globalStats: GlobalStats;
  activeCampaignId: string | null;
  userCampaignIds: string[];
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  initials: string;
  memberSince: string;
}

export type AppAction =
  | { type: 'CREATE_CAMPAIGN'; payload: Campaign }
  | { type: 'ADD_DONATION'; payload: Donation }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'DISMISS_NOTIFICATION'; payload: string }
  | { type: 'SET_ACTIVE_CAMPAIGN'; payload: string | null }
  | { type: 'RESET' };
