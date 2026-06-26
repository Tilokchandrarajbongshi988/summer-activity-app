import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CampImage from "../components/CampImage";
import useBookCamp from "../Guest hooks/useBookCamp";
import useGetCampDetails from "../Guest hooks/useGetCampdetails";
import useToggleFavorite from "../Guest hooks/useToggleFavorite";

const CampDetails = () => {
  const { campId } = useParams();
  const navigate = useNavigate();

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

  const handleBook = async () => {
    const booking = await bookCamp(selectedCamp._id);

    if (booking) {
      navigate("/bookings");
    }
  };

  const handleFavorite = async () => {
    const favorites = await toggleFavorite(selectedCamp._id);

    if (favorites) {
      navigate("/favorites");
    }
  };

  if (fetchingCamp && !selectedCamp) {
    return <p>Loading...</p>;
  }

  if (!selectedCamp) {
    return <p>Camp not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow">
        <CampImage
          src={selectedCamp.photo}
          alt={selectedCamp.activityName}
          className="h-64 w-full"
          rounded="rounded-xl"
        />

        <h1 className="mt-6 text-3xl font-bold">{selectedCamp.activityName}</h1>
        <p className="mt-2 text-gray-600">Location: {selectedCamp.location}</p>
        <p className="text-gray-600">Price: ₹{selectedCamp.price}</p>

        <p className="mt-4 rounded-xl bg-gray-100 p-4">
          {selectedCamp.description || "No description available."}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleFavorite}
            disabled={updatingFavorite || bookingCamp}
            className="rounded-lg bg-pink-600 px-4 py-2 font-semibold text-white hover:bg-pink-700 disabled:opacity-50"
          >
            {updatingFavorite ? "Saving..." : "Favorite"}
          </button>

          <button
            type="button"
            onClick={handleBook}
            disabled={updatingFavorite || bookingCamp}
            className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
          >
            {bookingCamp ? "Booking..." : "Book"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampDetails;
