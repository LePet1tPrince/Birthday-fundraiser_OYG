interface ProgressBarProps {
  current: number;
  goal: number;
  className?: string;
}

export default function ProgressBar({ current, goal, className = '' }: ProgressBarProps) {
  const percentage = Math.min((current / goal) * 100, 100);

  return (
    <div className={className}>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-semibold text-gray-900">${current.toLocaleString()} raised</span>
        <span className="text-gray-500">${goal.toLocaleString()} goal</span>
      </div>
      <div className="w-full bg-orange-100 rounded-full h-3 overflow-hidden">
        <div
          className="bg-gradient-to-r from-orange-400 to-amber-400 h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">{Math.round(percentage)}% of goal</p>
    </div>
  );
}
