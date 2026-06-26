import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useCampStore from "../zustand/useCampStore";

const useGetHostCamps = () => {
  const [loading, setLoading] = useState(false);
  const hostCamps = useCampStore((state) => state.hostCamps);
  const setHostCamps = useCampStore((state) => state.setHostCamps);

  useEffect(() => {
    const fetchCamps = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/host/my-camps", {
          credentials: "include",
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch host camps");
        }

        setHostCamps(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCamps();
  }, [setHostCamps]);

  return { camps: hostCamps, loading };
};

export default useGetHostCamps;
