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
          className="rounded-[1.75rem] border border-white/60 bg-white/70 p-7 shadow-xl backdrop-blur-md transition hover:-translate-y-1 hover:shadow-2xl"
        >
          <p className="text-4xl">📋</p>
          <h2 className="mt-4 text-2xl font-black text-orange-950">
            Host Camps
          </h2>
          <p className="mt-2 text-orange-900">
            View all camps you created.
          </p>
        </Link>

        <Link
          to="/host/my-camps"
          className="rounded-[1.75rem] border border-white/60 bg-white/70 p-7 shadow-xl backdrop-blur-md transition hover:-translate-y-1 hover:shadow-2xl"
        >
          <p className="text-4xl">✏️</p>
          <h2 className="mt-4 text-2xl font-black text-orange-950">
            Edit Camp
          </h2>
          <p className="mt-2 text-orange-900">
            Choose a camp and edit its details.
          </p>
        </Link>

        <Link
          to="/host/create-camp"
          className="rounded-[1.75rem] border border-white/60 bg-white/70 p-7 shadow-xl backdrop-blur-md transition hover:-translate-y-1 hover:shadow-2xl"
        >
          <p className="text-4xl">☀️</p>
          <h2 className="mt-4 text-2xl font-black text-orange-950">
            Create Camp
          </h2>
          <p className="mt-2 text-orange-900">
            Add a new summer activity.
          </p>
        </Link>
      </div>
    </SunnyPage>
  );
};

export default HostDashboard;
