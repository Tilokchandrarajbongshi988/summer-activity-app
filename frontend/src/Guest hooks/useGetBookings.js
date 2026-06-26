import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useCampStore from "../zustand/useCampStore";

const useGetBookings = () => {
  const [loading, setLoading] = useState(false);
  const bookings = useCampStore((state) => state.bookings);
  const setBookings = useCampStore((state) => state.setBookings);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "http://localhost:5000/api/bookings",
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch bookings");
        }

        setBookings(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [setBookings]);

  return { bookings, loading };
};

export default useGetBookings;
