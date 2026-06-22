import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? (
        <>
          {user.userType === "guest" && (
            <Link to="/guest/dashboard">Dashboard</Link>
          )}

          {user.userType === "host" && (
            <Link to="/host/dashboard">Dashboard</Link>
          )}
        </>
      ) : (
        <>
          <Link to="/">Login</Link>
          <Link to="/">Signup</Link>
        </>
      )}
    </>
  );
};

export default Navbar;