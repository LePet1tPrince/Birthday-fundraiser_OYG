import { useEffect } from 'react';
import { X, CheckCircle, Info } from 'lucide-react';
import { useAppContext } from '../../hooks/useAppContext';

export default function NotificationToast() {
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    if (state.notifications.length === 0) return;
    const latest = state.notifications[state.notifications.length - 1];
    const timer = setTimeout(() => {
      dispatch({ type: 'DISMISS_NOTIFICATION', payload: latest.id });
    }, 4000);
    return () => clearTimeout(timer);
  }, [state.notifications, dispatch]);

  if (state.notifications.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {state.notifications.map((n) => (
        <div
          key={n.id}
          className="animate-fade-in-up bg-white border border-orange-200 shadow-lg rounded-lg px-4 py-3 flex items-center gap-3 min-w-[300px]"
        >
          {n.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
          ) : (
            <Info className="w-5 h-5 text-orange-500 shrink-0" />
          )}
          <span className="text-sm text-gray-700 flex-1">{n.message}</span>
          <button
            onClick={() => dispatch({ type: 'DISMISS_NOTIFICATION', payload: n.id })}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
