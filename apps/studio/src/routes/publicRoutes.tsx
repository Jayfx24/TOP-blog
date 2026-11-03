// check if user is authenticated

import { useAuth } from "@blog/features";
import { Navigate, Outlet, useLocation } from "react-router";

export default function PublicRoutes() {
  const { user, isLoading } = useAuth();

  const location = useLocation();

  //   loading
  if (isLoading) {
    return <p>Loading... At public</p>;
  }
  if (user) {
    return <Navigate to={"/posts"} state={{ from: location }} replace />;
  }
  return <Outlet />;
}
