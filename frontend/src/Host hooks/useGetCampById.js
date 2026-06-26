import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetCampById = (campId) => {
  const [camp, setCamp] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCamp = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/host/camp/${campId}`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setCamp(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (campId) {
      fetchCamp();
    }
  }, [campId]);

  return { camp, loading };
};

export default useGetCampById;