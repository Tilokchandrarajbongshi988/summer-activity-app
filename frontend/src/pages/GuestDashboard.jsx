import { useNavigate } from "react-router-dom";

const GuestDashboard = () => {
  const navigate = useNavigate();

  return(
    <div>
      <h1>Guest Dashboard</h1>
       <button onClick={() => navigate("/camps")}>
         Camps
      </button>
      <button onClick={() => navigate("/favorites")}>
        Favorites
      </button>
      <button onClick={() => navigate("/bookings")}>
        Bookings
      </button>
    </div>
  )
}