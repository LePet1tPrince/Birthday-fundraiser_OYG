import { useState } from 'react';
import type { Campaign } from '../../types';
import { useAppContext } from '../../hooks/useAppContext';
import { IMPACT_RATES, getImpactUnits } from '../../data/mockData';
import Modal from '../shared/Modal';


const PRESET_AMOUNTS = [25, 50, 100, 250];

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

  const finalAmount = isCustom ? Number(customAmount) : amount;
  const rate = IMPACT_RATES[campaign.impactArea];
  const impactUnits = getImpactUnits(campaign.impactArea, finalAmount);

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
        createdAt: new Date().toISOString(),
      },
    });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: `notif-${Date.now()}`,
        type: 'success',
        message: `Thank you, ${donorName}! You're celebrating ${campaign.hostName.split(' ')[0]} in style.`,
      },
    });
    onClose();
  };

  return (
    <Modal title={`Celebrate ${campaign.hostName.split(' ')[0]}`} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Cause context */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg px-4 py-3 text-sm text-orange-800">
          Your gift goes to <strong>{rate.label}</strong>
        </div>

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
          <label className="block text-sm font-medium text-gray-700 mb-2">How much would you like to give?</label>
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
              Other
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

        {/* Impact preview */}
        {finalAmount > 0 && impactUnits > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-sm text-orange-800">
            $<strong>{finalAmount}</strong> = <strong>{impactUnits} {rate.unitLabel}</strong>
          </div>
        )}

        {/* Message */}
        <div>
          <label htmlFor="donor-message" className="block text-sm font-medium text-gray-700 mb-1">
            Leave a note for {campaign.hostName.split(' ')[0]} <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            id="donor-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={2}
            placeholder="Say something nice..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={!donorName || !finalAmount || finalAmount <= 0}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors"
        >
          Give ${finalAmount || 0}
        </button>
      </form>
    </Modal>
  );
}
