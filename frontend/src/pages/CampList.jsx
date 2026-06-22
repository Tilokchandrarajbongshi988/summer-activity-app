import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CampList = () => {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/guest", {
          credentials: "include",
        });

        const data = await res.json();
        setCamps(data);
      } catch (error) {
        console.log("Error fetching camps:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCamps();
  }, []);

  if (loading) {
    return <p>Loading camps...</p>;
  }

  if (camps.length === 0) {
    return <p>No camps available.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>All Camps</h1>

      {camps.map((camp) => (
        <div
          key={camp._id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "10px",
          }}
        >
          <h3>{camp.activityName}</h3>
          <p>{camp.description}</p>
          <p><strong>Location:</strong> {camp.location}</p>
          <p><strong>Price:</strong> ₹{camp.price}</p>
          <p><strong>Host:</strong> {camp.host?.fullName}</p>

          <button
            onClick={() => navigate(`/camp/${camp._id}`)}
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default CampList;