// hooks/useGetBookings.js
import { useEffect, useState } from "react";
import useCampStore from "../zustand/useCampStore";
import toast from "react-hot-toast";

const useGetBookings = () => {
  const [loading, setLoading] = useState(false);
  const { bookings, setBookings } = useCampStore();

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/bookings", {
          credentials: "include",
        });

        const data = await res.json();
        if (data.error) throw new Error(data.error);

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