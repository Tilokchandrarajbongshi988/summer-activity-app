import { Link } from "react-router-dom";
import SunnyPage from "../components/SunnyPage";

const HostDashboard = () => {
  return (
    <SunnyPage
      title="Host Dashboard"
      subtitle="Create camps, manage your listings, and keep your activities ready for guests."
      maxWidth="max-w-5xl"
    >
      <div className="grid gap-6 sm:grid-cols-3">
        <Link
          to="/host/my-camps"
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:border-gray-300 hover:shadow-md"
        >
          <h2 className="text-2xl font-bold text-gray-900">Host Camps</h2>
          <p className="mt-2 text-gray-600">View all camps you created.</p>
        </Link>

        <Link
          to="/host/my-camps"
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:border-gray-300 hover:shadow-md"
        >
          <h2 className="text-2xl font-bold text-gray-900">Edit Camp</h2>
          <p className="mt-2 text-gray-600">
            Choose a camp and edit its details.
          </p>
        </Link>

        <Link
          to="/host/create-camp"
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:border-gray-300 hover:shadow-md"
        >
          <h2 className="text-2xl font-bold text-gray-900">Create Camp</h2>
          <p className="mt-2 text-gray-600">Add a new summer activity.</p>
        </Link>
      </div>
    </SunnyPage>
  );
};

export default HostDashboard;
