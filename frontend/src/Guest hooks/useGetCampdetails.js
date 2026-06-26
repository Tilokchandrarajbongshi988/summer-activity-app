// hooks/useGetCampDetails.js
import { useState } from "react";
import useCampStore from "../zustand/useCampStore";
import toast from "react-hot-toast";

const useGetCampDetails = () => {
  const [loading, setLoading] = useState(false);
  const { selectedCamp, setSelectedCamp } = useCampStore();

  const fetchCampDetails = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/camps/${id}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setSelectedCamp(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { selectedCamp, fetchCampDetails, loading };
};

export default useGetCampDetails;