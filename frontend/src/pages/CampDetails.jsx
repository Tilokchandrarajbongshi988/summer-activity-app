// pages/CampDetails.jsx
import { useParams } from "react-router-dom";
import useGetCampDetails from "../Guest hooks/useGetCampdetails";
import useGetFavorites from "../Guest hooks/useGetFavorites";
import useGetBookings from "../Guest hooks/useGetBookings";
import { useEffect } from "react";

const CampDetails = () => {
  const { id } = useParams();

  const { selectedCamp, fetchCampDetails } = useGetCampDetails();
  const { toggleFavorite } = useToggleFavorite();
  const { bookCamp } = useBookCamp();

  useEffect(() => {
    if (!selectedCamp) {
      fetchCampDetails(id);
    }
  }, [id]);

  if (!selectedCamp) return <p>Loading...</p>;

  return (
    <div>
      <h1>{selectedCamp.title}</h1>
      <p>Location: {selectedCamp.location}</p>

      {/* ✅ Description visible ONLY here */}
      <p>{selectedCamp.description}</p>

      <button onClick={() => toggleFavorite(selectedCamp._id)}>
        ❤️ Favorite
      </button>

      <button onClick={() => bookCamp(selectedCamp._id)}>
        📅 Book
      </button>
    </div>
  );
};

export default CampDetails;