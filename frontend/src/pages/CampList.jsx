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
        <p className="rounded-2xl bg-white/60 p-6 text-orange-950 shadow">
          No camps available.
        </p>
      </SunnyPage>
    );
  }

  const actionLoading = bookingCamp || updatingFavorite;

  return (
    <SunnyPage
      title="All Camps"
      subtitle="Pick a sunny activity, open the details, then book it or save it as a favorite."
      maxWidth="max-w-7xl"
    >
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {camps.map((camp) => (
          <div
            key={camp._id}
            className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 shadow-xl backdrop-blur-md transition hover:-translate-y-1 hover:shadow-2xl"
          >
            <CampImage
              src={camp.photo}
              alt={camp.activityName}
              className="h-72 w-full"
            />

            <div className="p-7">
              <h3 className="text-2xl font-black text-orange-950">
                {camp.activityName}
              </h3>
              <p className="mt-3 text-orange-900">Location: {camp.location}</p>
              <p className="mt-1 font-semibold text-orange-900">
                Price: ₹{camp.price}
              </p>

              <button
                type="button"
                onClick={() => handleViewDetails(camp._id)}
                className="mt-6 rounded-full bg-orange-600 px-6 py-3 font-bold text-white shadow-lg hover:bg-orange-700"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {detailsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-orange-950/45 px-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-yellow-200 bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-100 p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4 rounded-[1.5rem] bg-white/60 p-4 shadow-sm">
              <h2 className="text-3xl font-black text-orange-950">
                Camp Details
              </h2>

              <button
                type="button"
                onClick={() => setDetailsOpen(false)}
                className="rounded-full bg-orange-100 px-4 py-1 text-2xl text-orange-950 hover:bg-orange-200"
              >
                ×
              </button>
            </div>

            {loadingDetails && <LoadingSpinner text="Loading details..." />}

            {!loadingDetails && !selectedCamp && (
              <p className="mt-6 text-orange-950">
                Could not load camp details.
              </p>
            )}

            {!loadingDetails && selectedCamp && (
              <div className="mt-6 space-y-5">
                <CampImage
                  src={selectedCamp.photo}
                  alt={selectedCamp.activityName}
                  className="h-80 w-full"
                  rounded="rounded-[1.5rem]"
                />

                <div className="rounded-[1.5rem] bg-white/70 p-5 shadow-sm">
                  <h3 className="text-3xl font-black text-orange-950">
                    {selectedCamp.activityName}
                  </h3>
                  <p className="mt-2 text-orange-900">
                    Location: {selectedCamp.location}
                  </p>
                  <p className="font-semibold text-orange-900">
                    Price: ₹{selectedCamp.price}
                  </p>
                </div>

                <p className="rounded-2xl border border-orange-100 bg-white/70 p-5 text-orange-950 shadow-sm">
                  {selectedCamp.description || "No description available."}
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleBook}
                    disabled={actionLoading}
                    className="flex items-center justify-center gap-2 rounded-full bg-green-600 px-6 py-3 font-bold text-white shadow hover:bg-green-700 disabled:opacity-50"
                  >
                    {bookingCamp ? "Booking..." : "Book"}
                  </button>

                  <button
                    type="button"
                    onClick={handleFavorite}
                    disabled={actionLoading}
                    className="flex items-center justify-center gap-2 rounded-full bg-orange-600 px-6 py-3 font-bold text-white shadow hover:bg-orange-700 disabled:opacity-50"
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
