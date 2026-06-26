import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampImage from "../components/CampImage";
import LoadingSpinner from "../components/LoadingSpinner";
import SunnyPage from "../components/SunnyPage";
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
    return (
      <SunnyPage maxWidth="max-w-6xl">
        <LoadingSpinner text="Loading camps..." />
      </SunnyPage>
    );
  }

  if (!loadingCamps && camps.length === 0) {
    return (
      <SunnyPage title="All Camps">
        <p className="rounded-xl border border-gray-200 bg-white p-6 text-gray-700 shadow-sm">
          No camps available.
        </p>
      </SunnyPage>
    );
  }

  const actionLoading = bookingCamp || updatingFavorite;

  return (
    <SunnyPage
      title="All Camps"
      subtitle="Open a camp to view details, book it, or save it as a favorite."
      maxWidth="max-w-7xl"
    >
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {camps.map((camp) => (
          <div
            key={camp._id}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:border-gray-300 hover:shadow-md"
          >
            <CampImage
              src={camp.photo}
              alt={camp.activityName}
              className="h-72 w-full"
            />

            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {camp.activityName}
              </h3>
              <p className="mt-3 text-gray-600">Location: {camp.location}</p>
              <p className="mt-1 font-medium text-gray-700">
                Price: Rs. {camp.price}
              </p>

              <button
                type="button"
                onClick={() => handleViewDetails(camp._id)}
                className="mt-6 rounded-lg bg-gray-900 px-5 py-2.5 font-semibold text-white hover:bg-gray-800"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {detailsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
            <div className="flex items-start justify-between gap-4 border-b border-gray-200 pb-4">
              <h2 className="text-3xl font-bold text-gray-900">
                Camp Details
              </h2>

              <button
                type="button"
                onClick={() => setDetailsOpen(false)}
                className="rounded-lg px-3 py-1 text-2xl text-gray-500 hover:bg-gray-100"
              >
                ×
              </button>
            </div>

            {loadingDetails && <LoadingSpinner text="Loading details..." />}

            {!loadingDetails && !selectedCamp && (
              <p className="mt-6 text-gray-700">
                Could not load camp details.
              </p>
            )}

            {!loadingDetails && selectedCamp && (
              <div className="mt-6 space-y-5">
                <CampImage
                  src={selectedCamp.photo}
                  alt={selectedCamp.activityName}
                  className="h-80 w-full"
                  rounded="rounded-xl"
                />

                <div>
                  <h3 className="text-3xl font-bold text-gray-900">
                    {selectedCamp.activityName}
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Location: {selectedCamp.location}
                  </p>
                  <p className="font-medium text-gray-700">
                    Price: Rs. {selectedCamp.price}
                  </p>
                </div>

                <p className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-gray-700">
                  {selectedCamp.description || "No description available."}
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleBook}
                    disabled={actionLoading}
                    className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
                  >
                    {bookingCamp ? "Booking..." : "Book"}
                  </button>

                  <button
                    type="button"
                    onClick={handleFavorite}
                    disabled={actionLoading}
                    className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    {updatingFavorite ? "Saving..." : "Favorite"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </SunnyPage>
  );
};

export default CampList;
