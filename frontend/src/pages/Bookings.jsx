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
        <p className="rounded-2xl bg-white/60 p-6 text-orange-950 shadow">
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
              className="overflow-hidden rounded-[1.75rem] border border-white/60 bg-white/70 shadow-xl backdrop-blur-md"
            >
              <CampImage
                src={camp?.photo}
                alt={camp?.activityName || "Camp"}
                className="h-56 w-full"
              />

              <div className="p-6">
                <h3 className="text-xl font-black text-orange-950">
                  {camp?.activityName || "Camp"}
                </h3>
                <p className="mt-2 text-orange-900">
                  Location: {camp?.location || "Not available"}
                </p>
                <p className="mt-1 font-semibold text-orange-900">
                  Price: {camp?.price ? `₹${camp.price}` : "Not available"}
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
