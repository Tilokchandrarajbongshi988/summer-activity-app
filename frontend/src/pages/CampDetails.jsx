import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useGetCampDetails from "../Guest hooks/useGetCampdetails";
import useToggleFavorite from "../Guest hooks/useToggleFavorite";
import useBookCamp from "../Guest hooks/useBookCamp";

const CampDetails = () => {
  const { campId } = useParams();

  const {
    selectedCamp,
    fetchCampDetails,
    loading: fetchingCamp,
  } = useGetCampDetails();
  const { toggleFavorite, loading: updatingFavorite } = useToggleFavorite();
  const { bookCamp, loading: bookingCamp } = useBookCamp();

  useEffect(() => {
    if (!selectedCamp || selectedCamp._id !== campId) {
      fetchCampDetails(campId);
    }
  }, [campId, selectedCamp, fetchCampDetails]);

  if (fetchingCamp && !selectedCamp) {
    return <p>Loading...</p>;
  }

  if (!selectedCamp) {
    return <p>Camp not found.</p>;
  }

  return (
    <div>
      <h1>{selectedCamp.activityName}</h1>
      <p>Location: {selectedCamp.location}</p>
      <p>Price: ₹{selectedCamp.price}</p>
      <p>{selectedCamp.description}</p>

      <button
        onClick={() => toggleFavorite(selectedCamp._id)}
        disabled={updatingFavorite}
      >
        {updatingFavorite ? "Updating..." : "Favorite"}
      </button>

      <button
        onClick={() => bookCamp(selectedCamp._id)}
        disabled={bookingCamp}
      >
        {bookingCamp ? "Booking..." : "Book"}
      </button>
    </div>
  );
};

export default CampDetails;
