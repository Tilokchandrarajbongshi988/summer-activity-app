import { useNavigate } from "react-router-dom";
import CampForm from "../components/CampForm";
import SunnyPage from "../components/SunnyPage";
import useCreateCamp from "../Host hooks/useCreateCamp";

const CreateCamp = () => {
  const { createCamp, loading } = useCreateCamp();
  const navigate = useNavigate();

  const handleCreate = async (form) => {
    const result = await createCamp(form);

    if (result) {
      navigate("/host/my-camps");
    }
  };

  return (
    <SunnyPage
      title="Create New Camp"
      subtitle="Add a summer activity for guests to discover."
      maxWidth="max-w-3xl"
      background="bg-orange-100"
    >
      <div className="rounded-xl border-2 border-black bg-white p-6">
        <CampForm
          onSubmit={handleCreate}
          submitting={loading}
          submitLabel="Create Camp"
          submittingLabel="Creating..."
        />
      </div>
    </SunnyPage>
  );
};

export default CreateCamp;
