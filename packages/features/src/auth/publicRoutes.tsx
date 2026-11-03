// check if user is authenticated

import { useAuth } from "./AuthContext";
import { Navigate, Outlet, useLocation } from "react-router";

export  function PublicRoutes() {
  const { user, isLoading} = useAuth();

  const location = useLocation();

  //   loading
  if (isLoading){
    return <p>Loading... At public</p>
  }
  if (user) {
  console.log("public is here")

    return <Navigate to={"/posts"} state={{ from: location }} replace />;
  }
  return <Outlet />;
}
