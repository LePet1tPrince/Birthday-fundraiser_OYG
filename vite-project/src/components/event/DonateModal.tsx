import { useState } from 'react';
import type { Campaign, ImpactArea } from '../../types';
import { useAppContext } from '../../hooks/useAppContext';
import { IMPACT_RATES } from '../../data/mockData';
import { Droplets, BookOpen, Heart, ShieldAlert } from 'lucide-react';
import Modal from '../shared/Modal';

const PRESET_AMOUNTS = [25, 50, 100, 250];

const ICONS: Record<ImpactArea, React.ElementType> = {
  water: Droplets,
  education: BookOpen,
  health: Heart,
  emergency: ShieldAlert,
};

interface DonateModalProps {
  campaign: Campaign;
  onClose: () => void;
}

export default function DonateModal({ campaign, onClose }: DonateModalProps) {
  const { dispatch } = useAppContext();
  const [donorName, setDonorName] = useState('');
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [message, setMessage] = useState('');
  const [impactArea, setImpactArea] = useState<ImpactArea>(campaign.impactAreas[0]);

  const finalAmount = isCustom ? Number(customAmount) : amount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName || !finalAmount || finalAmount <= 0) return;

    dispatch({
      type: 'ADD_DONATION',
      payload: {
        id: `don-${Date.now()}`,
        campaignId: campaign.id,
        donorName,
        amount: finalAmount,
        message,
        impactArea,
        createdAt: new Date().toISOString(),
      },
    });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: `notif-${Date.now()}`,
        type: 'success',
        message: `Thank you, ${donorName}! Your $${finalAmount} donation was received.`,
      },
    });
    onClose();
  };

  return (
    <Modal title={`Donate to ${campaign.name}`} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="donor-name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
          <input
            id="donor-name"
            type="text"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            placeholder="Full name"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Donation Amount</label>
          <div className="grid grid-cols-4 gap-2 mb-2">
            {PRESET_AMOUNTS.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => { setAmount(a); setIsCustom(false); }}
                className={`py-2 rounded-lg font-semibold text-sm transition-all ${
                  !isCustom && amount === a
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
                }`}
              >
                ${a}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsCustom(true)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isCustom ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
              }`}
            >
              Custom
            </button>
            {isCustom && (
              <input
                type="number"
                min="1"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Enter amount"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                autoFocus
              />
            )}
          </div>
        </div>

        {/* Impact Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Direct Your Impact</label>
          <div className="grid grid-cols-2 gap-2">
            {campaign.impactAreas.map((area) => {
              const Icon = ICONS[area];
              return (
                <button
                  key={area}
                  type="button"
                  onClick={() => setImpactArea(area)}
                  className={`flex items-center gap-2 p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                    impactArea === area
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 text-gray-700 hover:border-orange-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {IMPACT_RATES[area].label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="donor-message" className="block text-sm font-medium text-gray-700 mb-1">Message (optional)</label>
          <textarea
            id="donor-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={2}
            placeholder="Leave a message..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none"
          />
        </div>

        {/* Preview */}
        {finalAmount > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-sm text-orange-800">
            Your ${finalAmount} donation = <strong>{Math.floor(finalAmount / IMPACT_RATES[impactArea].costPerUnit)} {IMPACT_RATES[impactArea].unitLabel}</strong>
          </div>
        )}

        <button
          type="submit"
          disabled={!donorName || !finalAmount || finalAmount <= 0}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors"
        >
          Donate ${finalAmount || 0}
        </button>
      </form>
    </Modal>
  );
}
