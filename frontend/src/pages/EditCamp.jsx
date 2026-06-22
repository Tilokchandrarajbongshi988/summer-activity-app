import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCampById, updateCamp } from "../services/hostService";

const EditCamp = () => {
  const { campId } = useParams();
  const navigate = useNavigate();

  const [activityName, setActivityName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");


  const [loading, setLoading] = useState(true);

  const [updating, setUpdating] = useState(false);
  useEffect(() => {
    const fetchCamp = async () => {
      try {
        const data = await getCampById(campId);

        setActivityName(data.activityName || "");
        setDescription(data.description || "");
        setPrice(data.price || "");
        setLocation(data.location || "");
      } catch (error) {
        console.log("Error fetching camp:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCamp();
  }, [campId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const formData = {
      activityName,
      description,
      price,
      location,
    };

    try {
      const res = await updateCamp(campId, formData);
      console.log(res);

      navigate("/my-camps");
    } catch (error) {
      console.log("Update failed:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p>Loading camp...</p>;

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Edit Camp</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Activity Name"
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <button type="submit" disabled={updating}>
          {updating ? "Updating..." : "Update Camp"}
        </button>
      </form>
    </div>
  );
};

export default EditCamp;