import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CampImage from "../components/CampImage";
import LoadingSpinner from "../components/LoadingSpinner";
import SunnyPage from "../components/SunnyPage";
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
    return (
      <SunnyPage>
        <LoadingSpinner text="Loading camp..." />
      </SunnyPage>
    );
  }

  if (!selectedCamp) {
    return (
      <SunnyPage>
        <p className="rounded-xl border border-gray-200 bg-white p-6 text-gray-700 shadow-sm">
          Camp not found.
        </p>
      </SunnyPage>
    );
  }

  return (
    <SunnyPage maxWidth="max-w-3xl">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <CampImage
          src={selectedCamp.photo}
          alt={selectedCamp.activityName}
          className="h-80 w-full"
          rounded="rounded-xl"
        />

        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          {selectedCamp.activityName}
        </h1>
        <p className="mt-2 text-gray-600">Location: {selectedCamp.location}</p>
        <p className="font-medium text-gray-700">
          Price: Rs. {selectedCamp.price}
        </p>

        <p className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-5 text-gray-700">
          {selectedCamp.description || "No description available."}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleFavorite}
            disabled={updatingFavorite || bookingCamp}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            {updatingFavorite ? "Saving..." : "Favorite"}
          </button>

          <button
            type="button"
            onClick={handleBook}
            disabled={updatingFavorite || bookingCamp}
            className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {bookingCamp ? "Booking..." : "Book"}
          </button>
        </div>
      </div>
    </SunnyPage>
  );
};

export default CampDetails;
