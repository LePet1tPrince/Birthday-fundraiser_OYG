import { createContext, useReducer, useEffect, type ReactNode } from 'react';
import type { AppState, AppAction } from '../types';
import { sampleCampaigns, sampleDonations, initialGlobalStats } from '../data/mockData';

const SESSION_KEY = 'oyg_app_state';

const defaultState: AppState = {
  campaigns: sampleCampaigns,
  donations: sampleDonations,
  notifications: [],
  globalStats: initialGlobalStats,
  activeCampaignId: null,
  userCampaignIds: [],
};

function loadInitialState(): AppState {
  try {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...defaultState, ...parsed, notifications: [] };
    }
  } catch {
    // ignore parse errors
  }
  return defaultState;
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'CREATE_CAMPAIGN':
      return {
        ...state,
        campaigns: [...state.campaigns, action.payload],
        activeCampaignId: action.payload.id,
        userCampaignIds: [...state.userCampaignIds, action.payload.id],
      };
    case 'SET_ACTIVE_CAMPAIGN':
      return { ...state, activeCampaignId: action.payload };
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
    case 'RESET':
      return defaultState;
    default:
      return state;
  }
}

export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, undefined, loadInitialState);

  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
    } catch {
      // ignore storage errors
    }
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
