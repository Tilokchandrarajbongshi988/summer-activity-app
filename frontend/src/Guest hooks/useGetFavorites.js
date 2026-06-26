import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useCampStore from "../zustand/useCampStore";

const useGetFavorites = () => {
  const [loading, setLoading] = useState(false);
  const favorites = useCampStore((state) => state.favorites);
  const setFavorites = useCampStore((state) => state.setFavorites);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "/api/favourites",
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch favorites");
        }

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
