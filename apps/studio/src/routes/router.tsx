import App from "@/App";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "auth",
        element: "AuthLayout", //use components
        children: [
          { path: "login", element: "Login" },
          { path: "register", element: "Register" },
        ],
      },
    ],
  },
]);

export default router;
