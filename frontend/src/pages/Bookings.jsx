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
    <div>
      <h1>My Bookings</h1>

      {bookings.map((booking) => {
        const camp = booking.camp;

        return (
          <div key={booking._id}>
            <h3>{camp?.activityName || "Camp"}</h3>
            <p>Location: {camp?.location || "Not available"}</p>
            <p>Price: {camp?.price ? `₹${camp.price}` : "Not available"}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Bookings;
