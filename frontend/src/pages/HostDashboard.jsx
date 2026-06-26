import { Link } from "react-router-dom";

const HostDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold">Host Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Manage your camps from one place.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Link
            to="/host/my-camps"
            className="rounded-xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold">Host Camps</h2>
            <p className="mt-2 text-sm text-gray-600">
              View all camps you created.
            </p>
          </Link>

          <Link
            to="/host/my-camps"
            className="rounded-xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold">Edit Camp</h2>
            <p className="mt-2 text-sm text-gray-600">
              Choose a camp and edit its details.
            </p>
          </Link>

          <Link
            to="/host/create-camp"
            className="rounded-xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold">Create Camp</h2>
            <p className="mt-2 text-sm text-gray-600">
              Add a new activity camp.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;
