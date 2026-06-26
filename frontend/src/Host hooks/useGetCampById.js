import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useCampStore from "../zustand/useCampStore";

const useGetCampById = (campId) => {
  const [loading, setLoading] = useState(false);
  const selectedCamp = useCampStore((state) => state.selectedCamp);
  const setSelectedCamp = useCampStore((state) => state.setSelectedCamp);

  useEffect(() => {
    const fetchCamp = async () => {
      setSelectedCamp(null);
      setLoading(true);
      try {
        const res = await fetch(
          `/api/host/camp/${campId}`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch camp");
        }

        setSelectedCamp(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (campId) {
      fetchCamp();
    }
  }, [campId, setSelectedCamp]);

  return { camp: selectedCamp, loading };
};

export default useGetCampById;
