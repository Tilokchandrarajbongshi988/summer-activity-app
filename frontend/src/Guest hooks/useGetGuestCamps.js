import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useCampStore from "../zustand/useCampStore";

const useGetGuestCamps = () => {
  const [loading, setLoading] = useState(false);
  const camps = useCampStore((state) => state.camps);
  const setCamps = useCampStore((state) => state.setCamps);

  useEffect(() => {
    const fetchCamps = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/guest", {
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch camps");
        }

        if (!Array.isArray(data)) {
          throw new Error("Invalid camps response");
        }

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
