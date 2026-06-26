// pages/CreateCamp.jsx
import { useNavigate } from "react-router-dom";
import useCreateCamp from "../Host hooks/useCreateCamp";
import CampForm from "../components/CampForm";

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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Create New Camp
        </h1>

        <CampForm
          onSubmit={handleCreate}
          submitting={loading}
          submitLabel="Create Camp"
          submittingLabel="Creating..."
        />
      </div>
    </div>
  );
};

export default CreateCamp;
