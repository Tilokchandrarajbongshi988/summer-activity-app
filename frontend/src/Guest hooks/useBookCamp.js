import { useState } from "react";
import toast from "react-hot-toast";
import useCampStore from "../zustand/useCampStore";

const useBookCamp = () => {
  const [loading, setLoading] = useState(false);
  const addBooking = useCampStore((state) => state.addBooking);
  const selectedCamp = useCampStore((state) => state.selectedCamp);

  const bookCamp = async (campId) => {
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/bookings/${campId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to book camp");
      }

      const booking = {
        ...data.booking,
        camp:
          selectedCamp?._id === campId
            ? selectedCamp
            : data.booking.camp,
      };

      addBooking(booking);
      toast.success(data.message || "Booking successful");
      return booking;
    } catch (err) {
      toast.error(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { bookCamp, loading };
};

export default useBookCamp;
