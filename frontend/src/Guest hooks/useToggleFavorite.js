import { useState } from "react";
import toast from "react-hot-toast";
import useCampStore from "../zustand/useCampStore";

const useToggleFavorite = () => {
  const [loading, setLoading] = useState(false);

  const setFavorites = useCampStore((state) => state.setFavorites);

  const toggleFavorite = async (campId) => {
    setLoading(true);

    try {
      const res = await fetch(
        `/api/favourites/${campId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update favorites");
      }

      setFavorites(data.favourites);

      toast.success("Favorites updated");

      return data.favourites;
    } catch (err) {
      toast.error(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { toggleFavorite, loading };
};

export default useToggleFavorite;
