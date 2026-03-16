import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cake, Heart, Flame, Star } from 'lucide-react';
import type { EventType, ImpactArea } from '../../types';
import { useAppContext } from '../../hooks/useAppContext';
import ImpactAreaSelector from './ImpactAreaSelector';

const eventTypes: { value: EventType; label: string; icon: React.ElementType }[] = [
  { value: 'birthday', label: 'Birthday', icon: Cake },
  { value: 'anniversary', label: 'Anniversary', icon: Heart },
  { value: 'memorial', label: 'Memorial', icon: Flame },
  { value: 'other', label: 'Other', icon: Star },
];

export default function CreateEventForm() {
  const navigate = useNavigate();
  const { dispatch } = useAppContext();

  const [eventType, setEventType] = useState<EventType>('birthday');
  const [name, setName] = useState('');
  const [hostName, setHostName] = useState('');
  const [date, setDate] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [message, setMessage] = useState('');
  const [impactAreas, setImpactAreas] = useState<ImpactArea[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !hostName || !date || !goalAmount || impactAreas.length === 0) return;

    const id = `camp-${Date.now()}`;
    dispatch({
      type: 'CREATE_CAMPAIGN',
      payload: {
        id,
        eventType,
        name,
        hostName,
        date,
        goalAmount: Number(goalAmount),
        message,
        impactAreas,
        createdAt: new Date().toISOString(),
      },
    });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: `notif-${Date.now()}`,
        type: 'success',
        message: `"${name}" fundraiser created!`,
      },
    });
    navigate(`/event/${id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Event Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Event Type</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {eventTypes.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setEventType(value)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                eventType === value
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 bg-white hover:border-orange-300'
              }`}
            >
              <Icon className={`w-6 h-6 ${eventType === value ? 'text-orange-500' : 'text-gray-400'}`} />
              <span className={`text-sm font-medium ${eventType === value ? 'text-orange-700' : 'text-gray-700'}`}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Event Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Sarah's 30th Birthday"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
        />
      </div>

      {/* Host Name */}
      <div>
        <label htmlFor="host" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
        <input
          id="host"
          type="text"
          value={hostName}
          onChange={(e) => setHostName(e.target.value)}
          placeholder="Your full name"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
        />
      </div>

      {/* Date & Goal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
          />
        </div>
        <div>
          <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-1">Fundraising Goal ($)</label>
          <input
            id="goal"
            type="number"
            min="1"
            value={goalAmount}
            onChange={(e) => setGoalAmount(e.target.value)}
            placeholder="1000"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Personal Message</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="Tell your friends why this cause matters to you..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none"
        />
      </div>

      {/* Impact Areas */}
      <ImpactAreaSelector selected={impactAreas} onChange={setImpactAreas} />

      {/* Submit */}
      <button
        type="submit"
        disabled={!name || !hostName || !date || !goalAmount || impactAreas.length === 0}
        className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-lg transition-colors text-lg"
      >
        Create Fundraiser
      </button>
    </form>
  );
}
