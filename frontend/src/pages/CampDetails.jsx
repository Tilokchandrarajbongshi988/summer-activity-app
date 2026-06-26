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
        <p className="rounded-2xl bg-white/60 p-6 text-orange-950 shadow">
          Camp not found.
        </p>
      </SunnyPage>
    );
  }

  return (
    <SunnyPage maxWidth="max-w-3xl">
      <div className="rounded-[2rem] border border-white/60 bg-white/75 p-7 shadow-xl backdrop-blur-md">
        <CampImage
          src={selectedCamp.photo}
          alt={selectedCamp.activityName}
          className="h-80 w-full"
          rounded="rounded-[1.5rem]"
        />

        <h1 className="mt-6 text-3xl font-black text-orange-950">
          {selectedCamp.activityName}
        </h1>
        <p className="mt-2 text-orange-900">
          Location: {selectedCamp.location}
        </p>
        <p className="font-semibold text-orange-900">
          Price: ₹{selectedCamp.price}
        </p>

        <p className="mt-5 rounded-2xl bg-orange-50 p-5 text-orange-950">
          {selectedCamp.description || "No description available."}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleFavorite}
            disabled={updatingFavorite || bookingCamp}
            className="flex items-center justify-center gap-2 rounded-full bg-orange-600 px-6 py-3 font-bold text-white shadow hover:bg-orange-700 disabled:opacity-50"
          >
            {updatingFavorite ? "Saving..." : "Favorite"}
          </button>

          <button
            type="button"
            onClick={handleBook}
            disabled={updatingFavorite || bookingCamp}
            className="flex items-center justify-center gap-2 rounded-full bg-green-600 px-6 py-3 font-bold text-white shadow hover:bg-green-700 disabled:opacity-50"
          >
            {bookingCamp ? "Booking..." : "Book"}
          </button>
        </div>
      </div>
    </SunnyPage>
  );
};

export default CampDetails;
