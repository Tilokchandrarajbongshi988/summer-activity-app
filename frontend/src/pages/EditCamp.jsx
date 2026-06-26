import { useParams, useNavigate } from "react-router-dom";
import useUpdateCamp from "../Host hooks/useUpdateCamp";
import useDeleteCamp from "../Host hooks/useDeleteCamp";
import useGetCampById from "../Host hooks/useGetCampById";
import CampForm from "../components/CampForm";

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
    return <p>Loading...</p>;
  }

  if (!camp) {
    return <p>Camp not found.</p>;
  }

  return (
    <div>
      <h1>Edit Camp</h1>

      <CampForm
        key={camp._id}
        initialValues={camp}
        onSubmit={handleUpdate}
        onDelete={handleDelete}
        submitting={updating}
        deleting={deleting}
      />
    </div>
  );
};

export default EditCamp;
