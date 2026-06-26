import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingSpinner text="Checking your session..." />;
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
