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
          className="rounded-xl border-2 border-black bg-white p-6 hover:bg-yellow-50"
        >
          <h2 className="text-2xl font-bold text-black">All Camps</h2>
          <p className="mt-2 text-black/70">Browse every available camp.</p>
        </Link>

        <Link
          to="/bookings"
          className="rounded-xl border-2 border-black bg-white p-6 hover:bg-yellow-50"
        >
          <h2 className="text-2xl font-bold text-black">Bookings</h2>
          <p className="mt-2 text-black/70">View the camps you booked.</p>
        </Link>

        <Link
          to="/favorites"
          className="rounded-xl border-2 border-black bg-white p-6 hover:bg-yellow-50"
        >
          <h2 className="text-2xl font-bold text-black">Favorites</h2>
          <p className="mt-2 text-black/70">See your saved camps.</p>
        </Link>
      </div>
    </SunnyPage>
  );
};

export default GuestDashboard;
