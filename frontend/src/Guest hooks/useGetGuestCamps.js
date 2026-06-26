// hooks/useGetCamps.js
import { useEffect, useState } from "react";
import useCampStore from "../zustand/useCampStore";
import toast from "react-hot-toast";

const useGetGuestCamps = () => {
  const [loading, setLoading] = useState(false);
  const { camps, setCamps } = useCampStore();

  useEffect(() => {
    const fetchCamps = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/camps");
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        setCamps(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCamps();
  }, [setCamps]);

  return { camps, loading };
};

export default useGetGuestCamps;