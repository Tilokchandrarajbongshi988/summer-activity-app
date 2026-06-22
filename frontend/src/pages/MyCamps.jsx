import { useEffect, useState } from "react";
import { getMyCamps, deleteCamp } from "../services/hostService";
import { useNavigate } from "react-router-dom";

const MyCamps = () => {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const data = await getMyCamps();
        setCamps(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    };

    fetchCamps();
  }, []);

  const handleDelete = async (campId) => {
    try {
      const data = await deleteCamp(campId);

      setCamps((prevCamps) =>
        prevCamps.filter((camp) => camp._id !== campId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <p>Loading your camps...</p>;
  }

  if (camps.length === 0) {
    return <p>No camps created yet.</p>;
  }

  return (
    <div>
      <h1>My Camps</h1>

      {camps.map((camp) => (
        <div key={camp._id}>
          <h3>{camp.activityName}</h3>
          <p>{camp.description}</p>
          <p>{camp.location}</p>
          <p>₹{camp.price}</p>

          <button
            onClick={() =>
              navigate(`/host/edit-camp/${camp._id}`)
            }
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(camp._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyCamps;
