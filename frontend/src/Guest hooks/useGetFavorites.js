// hooks/useGetFavorites.js
import { useEffect, useState } from "react";
import useCampStore from "../zustand/useCampStore";
import toast from "react-hot-toast";

const useGetFavorites = () => {
  const [loading, setLoading] = useState(false);
  const { favorites, setFavorites } = useCampStore();

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/favorites", {
          credentials: "include",
        });

        const data = await res.json();
        if (data.error) throw new Error(data.error);

        setFavorites(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [setFavorites]);

  return { favorites, loading };
};

export default useGetFavorites;