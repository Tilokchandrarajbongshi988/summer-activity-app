import { useState } from "react";
import toast from "react-hot-toast";
import useCampStore from "../zustand/useCampStore";

const useDeleteCamp = () => {
  const [loading, setLoading] = useState(false);
  const deleteCampFromStore = useCampStore((state) => state.deleteCamp);

  const deleteCamp = async (campId) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/host/camp/${campId}`, {
        
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete camp");
      }

      deleteCampFromStore(campId);
      toast.success("Camp deleted");
      return data;
    } catch (err) {
      toast.error(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { deleteCamp, loading };
};

export default useDeleteCamp;
