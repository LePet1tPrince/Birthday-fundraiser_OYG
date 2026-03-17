import CreateEventForm from '../components/create/CreateEventForm';

export default function CreateEventPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Create Your Celebration Page
        </h1>
        <p className="text-gray-600 text-lg">
          Say "no gifts please" — and give your friends an easy, meaningful way to celebrate you.
        </p>
      </div>
      <CreateEventForm />
    </div>
  );
}
