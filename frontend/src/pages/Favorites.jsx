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
        <p className="rounded-xl border-2 border-black bg-white p-6 text-black">
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
            className="overflow-hidden rounded-xl border-2 border-black bg-white"
          >
            <CampImage
              src={camp.photo}
              alt={camp.activityName}
              className="h-56 w-full"
            />

            <div className="p-6">
              <h3 className="text-xl font-bold text-black">
                {camp.activityName}
              </h3>
              <p className="mt-2 text-black/70">Location: {camp.location}</p>
              <p className="mt-1 font-medium text-black">
                Price: Rs. {camp.price}
              </p>

              <button
                type="button"
                onClick={() => handleRemoveFavorite(camp._id)}
                disabled={removingFavorite}
                className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 font-semibold text-white hover:bg-black/80 disabled:opacity-50"
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
