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
    <div>
      <h1>Favorites</h1>

      {favorites.map((camp) => (
        <div key={camp._id}>
          <h3>{camp.activityName}</h3>
          <p>Location: {camp.location}</p>
          <p>Price: ₹{camp.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
