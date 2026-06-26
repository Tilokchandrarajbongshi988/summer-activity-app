import { Link } from "react-router-dom";
import SunnyPage from "../components/SunnyPage";

const GuestDashboard = () => {
  return (
    <SunnyPage
      title="Guest Dashboard"
      subtitle="Explore camps, manage bookings, and keep track of favorites."
      maxWidth="max-w-5xl"
    >
      <div className="grid gap-6 sm:grid-cols-3">
        <Link
          to="/camps"
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:border-gray-300 hover:shadow-md"
        >
          <h2 className="text-2xl font-bold text-gray-900">All Camps</h2>
          <p className="mt-2 text-gray-600">Browse every available camp.</p>
        </Link>

        <Link
          to="/bookings"
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:border-gray-300 hover:shadow-md"
        >
          <h2 className="text-2xl font-bold text-gray-900">Bookings</h2>
          <p className="mt-2 text-gray-600">View the camps you booked.</p>
        </Link>

        <Link
          to="/favorites"
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:border-gray-300 hover:shadow-md"
        >
          <h2 className="text-2xl font-bold text-gray-900">Favorites</h2>
          <p className="mt-2 text-gray-600">See your saved camps.</p>
        </Link>
      </div>
    </SunnyPage>
  );
};

export default GuestDashboard;
