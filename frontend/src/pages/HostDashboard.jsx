import { Link } from "react-router-dom";
import SunnyPage from "../components/SunnyPage";

const HostDashboard = () => {
  return (
    <SunnyPage
      title="Host Dashboard"
      subtitle="Create camps, manage your listings, and keep your activities ready for guests."
      maxWidth="max-w-5xl"
      background="bg-orange-100"
    >
      <div className="grid gap-6 sm:grid-cols-3">
        <Link
          to="/host/my-camps"
          className="rounded-xl border-2 border-black bg-white p-6 hover:bg-yellow-50"
        >
          <h2 className="text-2xl font-bold text-black">Host Camps</h2>
          <p className="mt-2 text-black/70">View all camps you created.</p>
        </Link>

        <Link
          to="/host/my-camps"
          className="rounded-xl border-2 border-black bg-white p-6 hover:bg-yellow-50"
        >
          <h2 className="text-2xl font-bold text-black">Edit Camp</h2>
          <p className="mt-2 text-black/70">
            Choose a camp and edit its details.
          </p>
        </Link>

        <Link
          to="/host/create-camp"
          className="rounded-xl border-2 border-black bg-white p-6 hover:bg-yellow-50"
        >
          <h2 className="text-2xl font-bold text-black">Create Camp</h2>
          <p className="mt-2 text-black/70">Add a new summer activity.</p>
        </Link>
      </div>
    </SunnyPage>
  );
};

export default HostDashboard;
