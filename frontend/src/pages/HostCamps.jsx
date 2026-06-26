import { useNavigate } from "react-router-dom";
import CampImage from "../components/CampImage";
import useDeleteCamp from "../Host hooks/useDeleteCamp";
import useGetHostCamps from "../Host hooks/useGetHostCamps";

const HostCamps = () => {
  const { camps, loading } = useGetHostCamps();
  const { deleteCamp } = useDeleteCamp();
  const navigate = useNavigate();

  const handleDelete = async (campId) => {
    await deleteCamp(campId);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!loading && camps.length === 0) {
    return <p>You haven't created any camps yet.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">My Camps</h1>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {camps.map((camp) => (
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
                <p className="mt-3 text-gray-700">
                  {camp.description || "No description available."}
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => navigate(`/host/edit-camp/${camp._id}`)}
                    className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(camp._id)}
                    className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HostCamps;
