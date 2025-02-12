import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RedirectIfAuthenticated = () => {
  const { accessToken } = useAuth();

  if (accessToken) {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
};

export default RedirectIfAuthenticated;
