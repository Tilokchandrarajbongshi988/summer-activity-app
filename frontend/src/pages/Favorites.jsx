import CampImage from "../components/CampImage";
import LoadingSpinner from "../components/LoadingSpinner";
import SunnyPage from "../components/SunnyPage";
import useGetFavorites from "../Guest hooks/useGetFavorites";
import useToggleFavorite from "../Guest hooks/useToggleFavorite";

const Favorites = () => {
  const { favorites, loading } = useGetFavorites();
  const { toggleFavorite, loading: removingFavorite } = useToggleFavorite();

  const handleRemoveFavorite = async (campId) => {
    await toggleFavorite(campId);
  };

  if (loading) {
    return (
      <SunnyPage>
        <LoadingSpinner text="Loading favorites..." />
      </SunnyPage>
    );
  }

  if (!loading && favorites.length === 0) {
    return (
      <SunnyPage title="Favorites">
        <p className="rounded-2xl bg-white/60 p-6 text-orange-950 shadow">
          No favorite camps yet.
        </p>
      </SunnyPage>
    );
  }

  return (
    <SunnyPage
      title="Favorites"
      subtitle="Your saved camps are here whenever you want to come back to them."
      maxWidth="max-w-6xl"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((camp) => (
          <div
            key={camp._id}
            className="overflow-hidden rounded-[1.75rem] border border-white/60 bg-white/70 shadow-xl backdrop-blur-md"
          >
            <CampImage
              src={camp.photo}
              alt={camp.activityName}
              className="h-56 w-full"
            />

            <div className="p-6">
              <h3 className="text-xl font-black text-orange-950">
                {camp.activityName}
              </h3>
              <p className="mt-2 text-orange-900">Location: {camp.location}</p>
              <p className="mt-1 font-semibold text-orange-900">
                Price: ₹{camp.price}
              </p>

                <button
                  type="button"
                  onClick={() => handleRemoveFavorite(camp._id)}
                  disabled={removingFavorite}
                  className="mt-5 flex items-center justify-center gap-2 rounded-full bg-red-600 px-5 py-2.5 font-bold text-white shadow hover:bg-red-700 disabled:opacity-50"
                >
                  {removingFavorite ? "Removing..." : "Remove Favorite"}
                </button>
            </div>
          </div>
        ))}
      </div>
    </SunnyPage>
  );
};

export default Favorites;
