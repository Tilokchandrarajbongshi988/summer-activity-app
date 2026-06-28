import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  const dashboardPath =
    user.userType === "host" ? "/host/dashboard" : "/guest/dashboard";
  const navLinks =
    user.userType === "host"
      ? [
          { label: "My Camps", path: "/host/my-camps" },
          { label: "Create Camp", path: "/host/create-camp" },
          { label: "Profile", path: "/profile" },
        ]
      : [
          { label: "All Camps", path: "/camps" },
          { label: "Bookings", path: "/bookings" },
          { label: "Favorites", path: "/favorites" },
          { label: "Profile", path: "/profile" },
        ];

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
    <nav className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b-2 border-black bg-white px-6 py-4">
      <div className="flex flex-wrap items-center gap-3">
        <Link
          to={dashboardPath}
          title="Home"
          className="rounded-lg border-2 border-black bg-yellow-300 px-4 py-2 font-semibold text-black hover:bg-yellow-200"
        >
          Home
        </Link>

        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="rounded-lg px-3 py-2 font-medium text-black hover:bg-yellow-200"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <button
        type="button"
        onClick={handleLogout}
        disabled={loggingOut}
        className="flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2 font-semibold text-white hover:bg-black/80 disabled:opacity-50"
      >
        {loggingOut ? "Logging out..." : "Logout"}
      </button>
    </nav>
  );
};

export default Navbar;
