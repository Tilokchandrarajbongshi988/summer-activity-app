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
          className="rounded-[1.75rem] border border-white/60 bg-white/70 p-7 shadow-xl backdrop-blur-md transition hover:-translate-y-1 hover:shadow-2xl"
        >
          <p className="text-4xl">🏕️</p>
          <h2 className="mt-4 text-2xl font-black text-orange-950">
            All Camps
          </h2>
          <p className="mt-2 text-orange-900">
            Browse every available camp.
          </p>
        </Link>

        <Link
          to="/bookings"
          className="rounded-[1.75rem] border border-white/60 bg-white/70 p-7 shadow-xl backdrop-blur-md transition hover:-translate-y-1 hover:shadow-2xl"
        >
          <p className="text-4xl">🎟️</p>
          <h2 className="mt-4 text-2xl font-black text-orange-950">
            Bookings
          </h2>
          <p className="mt-2 text-orange-900">
            View the camps you booked.
          </p>
        </Link>

        <Link
          to="/favorites"
          className="rounded-[1.75rem] border border-white/60 bg-white/70 p-7 shadow-xl backdrop-blur-md transition hover:-translate-y-1 hover:shadow-2xl"
        >
          <p className="text-4xl">⭐</p>
          <h2 className="mt-4 text-2xl font-black text-orange-950">
            Favorites
          </h2>
          <p className="mt-2 text-orange-900">See your saved camps.</p>
        </Link>
      </div>
    </SunnyPage>
  );
};

export default GuestDashboard;
