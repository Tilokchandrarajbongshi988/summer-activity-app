import useGetFavorites from "../Guest hooks/useGetFavorites";

const Favorites = () => {
  const { favorites, loading } = useGetFavorites();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Favorites</h1>

      {favorites.map((camp) => (
        <div key={camp._id}>
          <h3>{camp.title}</h3>
          <p>{camp.location}</p>
        </div>
      ))}
    </div>
  );
};

export default Favorites;