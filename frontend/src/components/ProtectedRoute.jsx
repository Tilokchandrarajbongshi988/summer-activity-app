import { useContext } from "react";
import AuthContext from "../context/AuthContextObject";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useContext(AuthContext);
  console.log("ProtectedRoute user:", user);
  console.log("ProtectedRoute loading:", loading);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  if (role && user.userType !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
