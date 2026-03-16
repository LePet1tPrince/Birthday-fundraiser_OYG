import { useState } from 'react';
import { Link2, Twitter, Facebook, Check } from 'lucide-react';

export default function ShareImpactButtons() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 bg-gray-900 text-white text-center">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-3">Spread the Word</h2>
        <p className="text-gray-400 mb-8">
          Share our collective impact and inspire others to turn their celebrations into change.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-lg transition-colors text-sm font-medium"
          >
            {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
          <button
            onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out the impact of Orange You Glad!')}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-lg transition-colors text-sm font-medium"
          >
            <Twitter className="w-4 h-4" />
            Twitter
          </button>
          <button
            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-lg transition-colors text-sm font-medium"
          >
            <Facebook className="w-4 h-4" />
            Facebook
          </button>
        </div>
      </div>
    </section>
  );
}
