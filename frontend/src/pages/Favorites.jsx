import CampImage from "../components/CampImage";
import useGetFavorites from "../Guest hooks/useGetFavorites";
import useToggleFavorite from "../Guest hooks/useToggleFavorite";

const Favorites = () => {
  const { favorites, loading } = useGetFavorites();
  const { toggleFavorite, loading: removingFavorite } = useToggleFavorite();

  const handleRemoveFavorite = async (campId) => {
    await toggleFavorite(campId);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!loading && favorites.length === 0) {
    return <p>No favorite camps yet.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">Favorites</h1>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((camp) => (
            <div
              key={camp._id}
              className="overflow-hidden rounded-xl bg-white shadow"
            >
              <CampImage
                src={camp.photo}
                alt={camp.activityName}
                className="h-44 w-full"
              />

              <div className="p-6">
                <h3 className="text-xl font-semibold">{camp.activityName}</h3>
                <p className="mt-2 text-gray-600">Location: {camp.location}</p>
                <p className="mt-1 text-gray-600">Price: ₹{camp.price}</p>

                <button
                  type="button"
                  onClick={() => handleRemoveFavorite(camp._id)}
                  disabled={removingFavorite}
                  className="mt-4 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                >
                  {removingFavorite ? "Removing..." : "Remove Favorite"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
