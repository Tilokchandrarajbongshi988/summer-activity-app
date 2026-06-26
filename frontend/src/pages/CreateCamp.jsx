// pages/CreateCamp.jsx
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
      subtitle="Add a bright summer activity for guests to discover."
      maxWidth="max-w-3xl"
    >
      <div className="rounded-[2rem] border border-white/60 bg-white/75 p-8 shadow-xl backdrop-blur-md">
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
