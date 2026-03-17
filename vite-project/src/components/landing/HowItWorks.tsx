import { Sparkles, Share2, Users, BarChart3 } from 'lucide-react';

const steps = [
  {
    icon: Sparkles,
    title: 'Create your page',
    description: 'Choose your occasion, pick one cause, write a message, and optionally set a group goal. Takes about two minutes.',
  },
  {
    icon: Share2,
    title: 'Share the link',
    description: 'Send it to friends and family. They give directly to Orange You Glad and leave you a note.',
  },
  {
    icon: Users,
    title: 'Watch it grow',
    description: 'See who\'s celebrating with you in real time. The page shows shared momentum, not a donation ticker.',
  },
  {
    icon: BarChart3,
    title: 'See your impact',
    description: 'After your celebration, get a recap — total raised, how many people joined, and exactly what it meant in the real world.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
          How It Works
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-14">
          A celebration page, not a fundraiser. The difference matters.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <step.icon className="w-8 h-8 text-orange-500" />
              </div>
              <div className="text-sm font-bold text-orange-500 mb-2">Step {i + 1}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
