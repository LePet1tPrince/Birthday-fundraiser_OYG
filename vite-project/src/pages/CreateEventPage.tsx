import CreateEventForm from '../components/create/CreateEventForm';

export default function CreateEventPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Create Your Fundraiser
        </h1>
        <p className="text-gray-600 text-lg">
          Turn your celebration into lasting impact for children around the world.
        </p>
      </div>
      <CreateEventForm />
    </div>
  );
}
