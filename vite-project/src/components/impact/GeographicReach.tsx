import { MapPin } from 'lucide-react';

const COUNTRIES = [
  'Kenya', 'Uganda', 'Tanzania', 'India', 'Bangladesh',
  'Guatemala', 'Haiti', 'Philippines', 'Cambodia', 'Nepal',
];

export default function GeographicReach() {
  return (
    <section className="py-16 bg-orange-50">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Geographic Reach</h2>
        <p className="text-gray-600 mb-10">Impact spanning {COUNTRIES.length} countries worldwide</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {COUNTRIES.map((country) => (
            <span
              key={country}
              className="inline-flex items-center gap-1.5 bg-white border border-orange-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm"
            >
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              {country}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
