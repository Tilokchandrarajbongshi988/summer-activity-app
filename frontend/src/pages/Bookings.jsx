import useGetBookings from "../Guest hooks/useGetBookings";

const Bookings = () => {
  const { bookings, loading } = useGetBookings();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>My Bookings</h1>

      {bookings.map((camp) => (
        <div key={camp._id}>
          <h3>{camp.title}</h3>
          <p>{camp.location}</p>
        </div>
      ))}
    </div>
  );
};

export default Bookings;