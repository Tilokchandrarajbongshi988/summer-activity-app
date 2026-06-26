import { useState } from "react";
import toast from "react-hot-toast";
import useCampStore from "../zustand/useCampStore";

const useUpdateCamp = (campId) => {
  const [loading, setLoading] = useState(false);
  const updateCampInStore = useCampStore((state) => state.updateCamp);

  const updateCamp = async (form) => {
    setLoading(true);

    try {
      const res = await fetch(
        `/api/host/camp/${campId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update camp");
      }

      updateCampInStore(data);
      toast.success("Camp updated");

      return data;
    } catch (err) {
      toast.error(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateCamp,
    loading,
  };
};

export default useUpdateCamp;
