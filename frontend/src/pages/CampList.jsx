import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useBookCamp from "../Guest hooks/useBookCamp";
import useGetCampDetails from "../Guest hooks/useGetCampdetails";
import useGetGuestCamps from "../Guest hooks/useGetGuestCamps";
import useToggleFavorite from "../Guest hooks/useToggleFavorite";

const CampList = () => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  const { camps, loading: loadingCamps } = useGetGuestCamps();
  const {
    selectedCamp,
    fetchCampDetails,
    loading: loadingDetails,
  } = useGetCampDetails();
  const { bookCamp, loading: bookingCamp } = useBookCamp();
  const { toggleFavorite, loading: updatingFavorite } = useToggleFavorite();
  const navigate = useNavigate();

  const handleViewDetails = async (campId) => {
    setDetailsOpen(true);
    await fetchCampDetails(campId);
  };

  const handleBook = async () => {
    if (!selectedCamp) return;

    const booking = await bookCamp(selectedCamp._id);

    if (booking) {
      setDetailsOpen(false);
      navigate("/bookings");
    }
  };

  const handleFavorite = async () => {
    if (!selectedCamp) return;

    const favorites = await toggleFavorite(selectedCamp._id);

    if (favorites) {
      setDetailsOpen(false);
      navigate("/favorites");
    }
  };

  if (loadingCamps) {
    return <p>Loading...</p>;
  }

  if (!loadingCamps && camps.length === 0) {
    return <p>No camps available.</p>;
  }

  const actionLoading = bookingCamp || updatingFavorite;

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">All Camps</h1>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {camps.map((camp) => (
            <div key={camp._id} className="rounded-xl bg-white p-6 shadow">
              <h3 className="text-xl font-semibold">{camp.activityName}</h3>
              <p className="mt-2 text-gray-600">Location: {camp.location}</p>
              <p className="mt-1 text-gray-600">Price: ₹{camp.price}</p>

              <button
                type="button"
                onClick={() => handleViewDetails(camp._id)}
                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {detailsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-bold">Camp Details</h2>

              <button
                type="button"
                onClick={() => setDetailsOpen(false)}
                className="rounded-lg px-3 py-1 text-xl hover:bg-gray-100"
              >
                ×
              </button>
            </div>

            {loadingDetails && <p className="mt-6">Loading details...</p>}

            {!loadingDetails && !selectedCamp && (
              <p className="mt-6">Could not load camp details.</p>
            )}

            {!loadingDetails && selectedCamp && (
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-semibold">
                    {selectedCamp.activityName}
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Location: {selectedCamp.location}
                  </p>
                  <p className="text-gray-600">Price: ₹{selectedCamp.price}</p>
                </div>

                <p className="rounded-xl bg-gray-100 p-4 text-gray-700">
                  {selectedCamp.description || "No description available."}
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleBook}
                    disabled={actionLoading}
                    className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                  >
                    {bookingCamp ? "Booking..." : "Book"}
                  </button>

                  <button
                    type="button"
                    onClick={handleFavorite}
                    disabled={actionLoading}
                    className="rounded-lg bg-pink-600 px-4 py-2 font-semibold text-white hover:bg-pink-700 disabled:opacity-50"
                  >
                    {updatingFavorite ? "Saving..." : "Favorite"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CampList;
