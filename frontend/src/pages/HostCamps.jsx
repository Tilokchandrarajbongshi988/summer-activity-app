// pages/HostCamps.jsx
import { useNavigate } from "react-router-dom";
import useGetHostCamps from "../Host hooks/useGetHostCamps";
import useDeleteCamp from "../Host hooks/useDeleteCamp";

const HostCamps = () => {
  const { camps, loading } = useGetHostCamps();
  const { deleteCamp } = useDeleteCamp();
  const navigate = useNavigate();

  const handleDelete = async (campId) => {
    await deleteCamp(campId);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!loading && camps.length === 0) {
    return <p>You haven't created any camps yet.</p>;
  }

  return (
    <div>
      <h1>My Camps</h1>

      {camps.map((camp) => (
        <div key={camp._id}>
          <h3>{camp.activityName}</h3>

          <p>
            <strong>Location:</strong> {camp.location}
          </p>

          <p>
            <strong>Price:</strong> ₹{camp.price}
          </p>

          <p>
            <strong>Description:</strong> {camp.description}
          </p>

          <button
            onClick={() =>
              navigate(`/host/edit-camp/${camp._id}`)
            }
          >
            ✏️ Edit
          </button>

          <button
            onClick={() => handleDelete(camp._id)}
          >
            🗑️ Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default HostCamps;
