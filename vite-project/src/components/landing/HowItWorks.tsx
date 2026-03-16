import { PartyPopper, Share2, Globe } from 'lucide-react';

const steps = [
  {
    icon: PartyPopper,
    title: 'Create Your Event',
    description: 'Set up a fundraising page for your birthday, anniversary, or any celebration in minutes.',
  },
  {
    icon: Share2,
    title: 'Share With Friends',
    description: 'Invite friends and family to donate instead of buying gifts. Every dollar makes a difference.',
  },
  {
    icon: Globe,
    title: 'See Your Impact',
    description: 'Watch your donations transform into clean water, education, healthcare, and emergency relief.',
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
          Three simple steps to turn your celebration into lasting change.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <step.icon className="w-8 h-8 text-orange-500" />
              </div>
              <div className="text-sm font-bold text-orange-500 mb-2">Step {i + 1}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
