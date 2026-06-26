import CampImage from "../components/CampImage";
import LoadingSpinner from "../components/LoadingSpinner";
import SunnyPage from "../components/SunnyPage";
import useGetBookings from "../Guest hooks/useGetBookings";

const Bookings = () => {
  const { bookings, loading } = useGetBookings();

  if (loading) {
    return (
      <SunnyPage>
        <LoadingSpinner text="Loading bookings..." />
      </SunnyPage>
    );
  }

  if (!loading && bookings.length === 0) {
    return (
      <SunnyPage title="My Bookings">
        <p className="rounded-xl border-2 border-black bg-white p-6 text-black">
          No bookings yet.
        </p>
      </SunnyPage>
    );
  }

  return (
    <SunnyPage
      title="My Bookings"
      subtitle="These are the camps you have booked."
      maxWidth="max-w-6xl"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking) => {
          const camp = booking.camp;

          return (
            <div
              key={booking._id}
              className="overflow-hidden rounded-xl border-2 border-black bg-white"
            >
              <CampImage
                src={camp?.photo}
                alt={camp?.activityName || "Camp"}
                className="h-56 w-full"
              />

              <div className="p-6">
                <h3 className="text-xl font-bold text-black">
                  {camp?.activityName || "Camp"}
                </h3>
                <p className="mt-2 text-black/70">
                  Location: {camp?.location || "Not available"}
                </p>
                <p className="mt-1 font-medium text-black">
                  Price: {camp?.price ? `Rs. ${camp.price}` : "Not available"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </SunnyPage>
  );
};

export default Bookings;
