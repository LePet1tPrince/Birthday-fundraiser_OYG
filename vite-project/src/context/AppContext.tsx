import { createContext, useReducer, type ReactNode } from 'react';
import type { AppState, AppAction } from '../types';
import { sampleCampaigns, sampleDonations, initialGlobalStats } from '../data/mockData';

const initialState: AppState = {
  campaigns: sampleCampaigns,
  donations: sampleDonations,
  notifications: [],
  globalStats: initialGlobalStats,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'CREATE_CAMPAIGN':
      return { ...state, campaigns: [...state.campaigns, action.payload] };
    case 'ADD_DONATION':
      return {
        ...state,
        donations: [...state.donations, action.payload],
        globalStats: {
          ...state.globalStats,
          totalRaised: state.globalStats.totalRaised + action.payload.amount,
          peopleReached: state.globalStats.peopleReached + 1,
        },
      };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [...state.notifications, action.payload] };
    case 'DISMISS_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter((n) => n.id !== action.payload),
      };
    default:
      return state;
  }
}

export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
