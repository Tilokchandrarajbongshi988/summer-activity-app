import { useNavigate } from "react-router-dom";
import CampImage from "../components/CampImage";
import LoadingSpinner from "../components/LoadingSpinner";
import SunnyPage from "../components/SunnyPage";
import useDeleteCamp from "../Host hooks/useDeleteCamp";
import useGetHostCamps from "../Host hooks/useGetHostCamps";

const HostCamps = () => {
  const { camps, loading } = useGetHostCamps();
  const { deleteCamp, loading: deletingCamp } = useDeleteCamp();
  const navigate = useNavigate();

  const handleDelete = async (campId) => {
    await deleteCamp(campId);
  };

  if (loading) {
    return (
      <SunnyPage>
        <LoadingSpinner text="Loading your camps..." />
      </SunnyPage>
    );
  }

  if (!loading && camps.length === 0) {
    return (
      <SunnyPage title="My Camps">
        <p className="rounded-xl border border-gray-200 bg-white p-6 text-gray-700 shadow-sm">
          You haven&apos;t created any camps yet.
        </p>
      </SunnyPage>
    );
  }

  return (
    <SunnyPage
      title="My Camps"
      subtitle="Preview, edit, or delete the camps guests can see."
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
              className="h-64 w-full"
            />

            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {camp.activityName}
              </h3>
              <p className="mt-3 text-gray-600">Location: {camp.location}</p>
              <p className="mt-1 font-medium text-gray-700">
                Price: Rs. {camp.price}
              </p>
              <p className="mt-4 line-clamp-3 text-gray-700">
                {camp.description || "No description available."}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => navigate(`/host/edit-camp/${camp._id}`)}
                  className="rounded-lg bg-gray-900 px-4 py-2.5 font-semibold text-white hover:bg-gray-800"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(camp._id)}
                  disabled={deletingCamp}
                  className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SunnyPage>
  );
};

export default HostCamps;
