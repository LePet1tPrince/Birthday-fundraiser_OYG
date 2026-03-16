import { Heart } from 'lucide-react';

interface DonateButtonProps {
  onClick: () => void;
}

export default function DonateButton({ onClick }: DonateButtonProps) {
  return (
    <button
      onClick={onClick}
      className="animate-pulse-glow inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-4 rounded-xl transition-colors text-lg"
    >
      <Heart className="w-5 h-5 fill-white" />
      Donate Now
    </button>
  );
}
