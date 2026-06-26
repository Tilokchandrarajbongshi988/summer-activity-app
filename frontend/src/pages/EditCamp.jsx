import { useNavigate, useParams } from "react-router-dom";
import CampForm from "../components/CampForm";
import LoadingSpinner from "../components/LoadingSpinner";
import SunnyPage from "../components/SunnyPage";
import useDeleteCamp from "../Host hooks/useDeleteCamp";
import useGetCampById from "../Host hooks/useGetCampById";
import useUpdateCamp from "../Host hooks/useUpdateCamp";

const EditCamp = () => {
  const { campId } = useParams();
  const navigate = useNavigate();

  const { camp, loading } = useGetCampById(campId);
  const { updateCamp, loading: updating } = useUpdateCamp(campId);
  const { deleteCamp, loading: deleting } = useDeleteCamp();

  const handleUpdate = async (form) => {
    const updatedCamp = await updateCamp(form);

    if (updatedCamp) {
      navigate("/host/my-camps");
    }
  };

  const handleDelete = async () => {
    const deletedCamp = await deleteCamp(campId);

    if (deletedCamp) {
      navigate("/host/my-camps");
    }
  };

  if (loading && !camp) {
    return (
      <SunnyPage>
        <LoadingSpinner text="Loading camp..." />
      </SunnyPage>
    );
  }

  if (!camp) {
    return (
      <SunnyPage>
        <p className="rounded-xl border-2 border-black bg-white p-6 text-black">
          Camp not found.
        </p>
      </SunnyPage>
    );
  }

  return (
    <SunnyPage
      title="Edit Camp"
      subtitle="Update the camp details, image, or remove the camp."
      maxWidth="max-w-3xl"
    >
      <div className="rounded-xl border-2 border-black bg-white p-6">
        <CampForm
          key={camp._id}
          initialValues={camp}
          onSubmit={handleUpdate}
          onDelete={handleDelete}
          submitting={updating}
          deleting={deleting}
        />
      </div>
    </SunnyPage>
  );
};

export default EditCamp;
