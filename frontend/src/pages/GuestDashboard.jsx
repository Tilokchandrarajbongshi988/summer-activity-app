import { Link } from "react-router-dom";

const GuestDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold">Guest Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Explore camps, manage bookings, and keep track of favorites.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Link
            to="/camps"
            className="rounded-xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold">All Camps</h2>
            <p className="mt-2 text-sm text-gray-600">
              Browse every available camp.
            </p>
          </Link>

          <Link
            to="/bookings"
            className="rounded-xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold">Bookings</h2>
            <p className="mt-2 text-sm text-gray-600">
              View the camps you booked.
            </p>
          </Link>

          <Link
            to="/favorites"
            className="rounded-xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold">Favorites</h2>
            <p className="mt-2 text-sm text-gray-600">
              See your saved camps.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GuestDashboard;
