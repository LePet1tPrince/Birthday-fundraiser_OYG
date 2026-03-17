import { useState } from 'react';
import { Link2, Twitter, Facebook, Mail, Check } from 'lucide-react';

interface ShareButtonsProps {
  campaignName: string;
}

export default function ShareButtons({ campaignName }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const buttons = [
    {
      label: copied ? 'Copied!' : 'Copy Link',
      icon: copied ? Check : Link2,
      onClick: handleCopy,
    },
    {
      label: 'Twitter',
      icon: Twitter,
      onClick: () => window.open(`https://twitter.com/intent/tweet?text=Support ${encodeURIComponent(campaignName)} on Orange You Glad!&url=${encodeURIComponent(window.location.href)}`, '_blank'),
    },
    {
      label: 'Facebook',
      icon: Facebook,
      onClick: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank'),
    },
    {
      label: 'Email',
      icon: Mail,
      onClick: () => window.open(`mailto:?subject=Celebrate ${encodeURIComponent(campaignName)}&body=Join this celebration on Orange You Glad — no gifts, just impact: ${encodeURIComponent(window.location.href)}`, '_blank'),
    },
  ];

  return (
    <div className="text-center">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Share This Celebration</h3>
      <div className="flex items-center justify-center gap-3 flex-wrap">
        {buttons.map((btn) => (
          <button
            key={btn.label}
            onClick={btn.onClick}
            className="inline-flex items-center gap-2 bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-600 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium"
          >
            <btn.icon className="w-4 h-4" />
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
