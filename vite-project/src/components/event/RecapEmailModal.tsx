import { useState } from 'react';
import { X, Mail, Copy, Check, Heart } from 'lucide-react';
import type { Campaign } from '../../types';
import { IMPACT_RATES, getImpactUnits } from '../../data/mockData';

interface RecapEmailModalProps {
  campaign: Campaign;
  totalRaised: number;
  contributorCount: number;
  onClose: () => void;
}

type Tab = 'host' | 'guests' | 'post';

export default function RecapEmailModal({ campaign, totalRaised, contributorCount, onClose }: RecapEmailModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>('host');
  const [copied, setCopied] = useState(false);

  const rate = IMPACT_RATES[campaign.impactArea];
  const impactUnits = getImpactUnits(campaign.impactArea, totalRaised);
  const hostFirstName = campaign.hostName.split(' ')[0];

  const hostSubject = `Your ${campaign.name} recap — thank you`;
  const hostBody = `Hi ${hostFirstName},

Your celebration is complete, and what you started together is remarkable.

Here's your impact report:

  • ${contributorCount} friend${contributorCount !== 1 ? 's' : ''} celebrated with you
  • $${totalRaised.toLocaleString()} was given to ${rate.label}
  • ${impactUnits} people reached with ${rate.label} programming

None of this would have happened without you choosing to celebrate differently. Thank you for making your birthday matter beyond the day.

With gratitude,
The Orange You Glad Team`;

  const guestMessage = `Thanks to everyone who celebrated ${hostFirstName} for ${campaign.name}!

Together, we reached ${impactUnits} people with ${rate.label} programming — and that impact lasts far beyond the party.

Thank you for celebrating with purpose. 🧡`;

  const postCaption = `Feeling so grateful. 🧡

${contributorCount} of my people came together and reached ${impactUnits} people through ${rate.label} programming — because they chose impact over gifts.

No party favors. Just love, and something that lasts.

Thank you. Every single one of you. 🧡

#OrangeYouGlad #CelebrateWithPurpose`;

  const handleCopyGuestReport = () => {
    navigator.clipboard.writeText(guestMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(postCaption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendHostEmail = () => {
    const mailto = `mailto:?subject=${encodeURIComponent(hostSubject)}&body=${encodeURIComponent(hostBody)}`;
    window.open(mailto, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-lg font-extrabold text-gray-900">Send Recap</h2>
            <p className="text-sm text-gray-400 mt-0.5">{campaign.name}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 mx-6 mt-4 rounded-xl shrink-0">
          <button
            onClick={() => setActiveTab('host')}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'host' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Your Thank-You
          </button>
          <button
            onClick={() => setActiveTab('guests')}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'guests' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Guest Report
          </button>
          <button
            onClick={() => setActiveTab('post')}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'post' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Share Post
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'host' ? (
            <>
              <p className="text-xs text-gray-400 mb-3">A private recap sent to you — includes the full financial summary.</p>

              {/* Impact callout */}
              <div className="bg-gradient-to-r from-orange-500 to-amber-400 rounded-xl p-4 text-white text-center mb-4">
                <p className="text-4xl font-extrabold">{impactUnits}</p>
                <p className="text-sm font-semibold mt-1">people reached with {rate.label}</p>
                <p className="text-white/70 text-xs mt-1">${totalRaised.toLocaleString()} · {contributorCount} contributor{contributorCount !== 1 ? 's' : ''}</p>
              </div>

              {/* Email preview */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-700 font-mono whitespace-pre-wrap leading-relaxed">
                {hostBody}
              </div>
            </>
          ) : activeTab === 'guests' ? (
            <>
              <p className="text-xs text-gray-400 mb-3">Share this with your guests — shows the impact you created together, without any dollar amounts.</p>

              {/* Impact callout */}
              <div className="bg-gradient-to-r from-orange-500 to-amber-400 rounded-xl p-4 text-white text-center mb-4">
                <p className="text-4xl font-extrabold">{impactUnits}</p>
                <p className="text-sm font-semibold mt-1">people reached with {rate.label}</p>
                <p className="text-white/70 text-xs mt-1">{contributorCount} friend{contributorCount !== 1 ? 's' : ''} celebrated with {hostFirstName}</p>
              </div>

              {/* Message preview */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {guestMessage}
              </div>
            </>
          ) : (
            <>
              <p className="text-xs text-gray-400 mb-3">A shareable post card for Instagram, Facebook, or anywhere. Screenshot the card and copy the caption below.</p>

              {/* Post card */}
              <div className="relative rounded-2xl overflow-hidden mb-4" style={{ aspectRatio: '1 / 1' }}>
                {/* Background gradient layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-amber-400 to-orange-600" />
                {/* Decorative blobs */}
                <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10" />
                <div className="absolute -bottom-16 -left-10 w-56 h-56 rounded-full bg-white/10" />
                <div className="absolute top-1/3 right-8 w-24 h-24 rounded-full bg-amber-300/30" />
                <div className="absolute bottom-1/4 left-1/4 w-16 h-16 rounded-full bg-orange-300/20" />
                {/* Dot texture */}
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-8 gap-3">
                  <div className="flex items-center gap-1.5 text-white/80 text-sm font-semibold tracking-wide uppercase">
                    <Heart className="w-4 h-4 fill-white/60" />
                    <span>Orange You Glad</span>
                  </div>

                  <p className="text-lg font-semibold text-white/90 leading-snug">
                    Together, we reached
                  </p>

                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/30">
                    <p className="text-6xl font-extrabold tracking-tight leading-none">{impactUnits}</p>
                    <p className="text-sm font-semibold mt-1 text-white/90">people</p>
                  </div>

                  <p className="text-base font-medium text-white/90 leading-snug">
                    through <span className="font-bold">{rate.label}</span> programming
                  </p>

                  <p className="text-white/70 text-sm mt-1">
                    {contributorCount} friend{contributorCount !== 1 ? 's' : ''} · {campaign.name}
                  </p>

                  <p className="text-white/60 text-xs mt-2 font-medium">
                    Skip the gifts. Celebrate with purpose.
                  </p>
                </div>
              </div>

              {/* Caption preview */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {postCaption}
              </div>
            </>
          )}
        </div>

        {/* Footer action */}
        <div className="p-6 border-t border-gray-100 shrink-0">
          {activeTab === 'host' ? (
            <button
              onClick={handleSendHostEmail}
              className="w-full inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors"
            >
              <Mail className="w-4 h-4" />
              Open in Email
            </button>
          ) : activeTab === 'guests' ? (
            <button
              onClick={handleCopyGuestReport}
              className="w-full inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Message'}
            </button>
          ) : (
            <button
              onClick={handleCopyCaption}
              className="w-full inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Caption Copied!' : 'Copy Caption'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
