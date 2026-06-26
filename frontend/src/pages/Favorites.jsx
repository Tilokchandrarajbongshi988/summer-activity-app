import CampImage from "../components/CampImage";
import useGetFavorites from "../Guest hooks/useGetFavorites";

const Favorites = () => {
  const { favorites, loading } = useGetFavorites();

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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
