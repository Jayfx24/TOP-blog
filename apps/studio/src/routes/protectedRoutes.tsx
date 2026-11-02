// check if user is authenticated

import { useAuth } from "@/features/auth/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router";

export default function ProtectedRoutes() {
  const { user , isLoading} = useAuth();

  const location = useLocation();

  //   loading
  if (isLoading){
    return <p>Loading...</p>
  }

  if (!user) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
  return <Outlet />;
}
