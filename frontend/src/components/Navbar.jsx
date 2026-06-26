import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContextObject";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  const dashboardPath =
    user.userType === "host" ? "/host/dashboard" : "/guest/dashboard";

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      await logout();
      navigate("/");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-white/90 px-6 py-4 shadow backdrop-blur">
      <Link
        to={dashboardPath}
        title="Home"
        className="rounded-lg border px-4 py-2 text-xl hover:bg-gray-100"
      >
        🏠
      </Link>

      <button
        type="button"
        onClick={handleLogout}
        disabled={loggingOut}
        className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
      >
        {loggingOut ? "Logging out..." : "Logout"}
      </button>
    </nav>
  );
};

export default Navbar;
