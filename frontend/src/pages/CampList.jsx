// pages/AllCamps.jsx
import { useNavigate } from "react-router-dom";
import useGetGuestCamps from "../Guest hooks/useGetGuestCamps";
import useGetCampDetails from "../Guest hooks/useGetCampdetails";

const Camplist = () => {
  const { camps, loading } = useGetCamps();
  const { fetchCampDetails } = useGetCampDetails();
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>All Camps</h1>

      {camps.map((camp) => (
        <div key={camp._id} style={{ border: "1px solid gray", margin: 10 }}>
          <h3>{camp.title}</h3>
          <p>Location: {camp.location}</p>

          {/* ❌ NO description here */}

          <button
            onClick={() => {
              fetchCampDetails(camp._id);
              navigate(`/camp/${camp._id}`);
            }}
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default Camplist;