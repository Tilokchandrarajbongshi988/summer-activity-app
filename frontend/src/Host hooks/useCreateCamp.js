// useCreateCamp.js

import { useState } from "react";
import toast from "react-hot-toast";
import useCampStore from "../zustand/useCampStore";

const useCreateCamp = () => {
  const [loading, setLoading] = useState(false);
  const addCamp = useCampStore((state) => state.addCamp);

  const createCamp = async (form) => {
    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5000/api/host/createcamp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create camp");
      }

      addCamp(data);
      toast.success("Camp created");
      return data;
    } catch (err) {
      toast.error(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createCamp, loading };
};

export default useCreateCamp;
