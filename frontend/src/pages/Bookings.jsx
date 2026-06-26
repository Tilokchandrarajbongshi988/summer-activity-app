import CampImage from "../components/CampImage";
import useGetBookings from "../Guest hooks/useGetBookings";

const Bookings = () => {
  const { bookings, loading } = useGetBookings();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!loading && bookings.length === 0) {
    return <p>No bookings yet.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">My Bookings</h1>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => {
            const camp = booking.camp;

            return (
              <div
                key={booking._id}
                className="overflow-hidden rounded-xl bg-white shadow"
              >
                <CampImage
                  src={camp?.photo}
                  alt={camp?.activityName || "Camp"}
                  className="h-44 w-full"
                />

                <div className="p-6">
                  <h3 className="text-xl font-semibold">
                    {camp?.activityName || "Camp"}
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Location: {camp?.location || "Not available"}
                  </p>
                  <p className="mt-1 text-gray-600">
                    Price: {camp?.price ? `₹${camp.price}` : "Not available"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
