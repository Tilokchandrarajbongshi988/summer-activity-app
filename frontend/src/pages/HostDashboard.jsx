import { useNavigate } from "react-router-dom";

const HostDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Host Dashboard</h1>
       <button onClick={() => navigate("/host/create-camp")}>
        create camp
      </button>
      <button onClick={() => navigate("/host/my-camps")}>
        View My Camps
      </button>
    </div>
  );
};

export default HostDashboard;