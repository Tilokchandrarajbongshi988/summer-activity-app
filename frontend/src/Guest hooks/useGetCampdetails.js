import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import useCampStore from "../zustand/useCampStore";

const useGetCampDetails = () => {
  const [loading, setLoading] = useState(false);
  const selectedCamp = useCampStore((state) => state.selectedCamp);
  const setSelectedCamp = useCampStore((state) => state.setSelectedCamp);

  const fetchCampDetails = useCallback(async (campId) => {
    setSelectedCamp(null);
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/guest/camps/${campId}`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch camp details");
      }

      setSelectedCamp(data);
      return data;
    } catch (err) {
      toast.error(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [setSelectedCamp]);

  return { selectedCamp, fetchCampDetails, loading };
};

export default useGetCampDetails;
