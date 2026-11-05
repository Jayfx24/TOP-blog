import { createBrowserRouter } from "react-router";
import App from "./App.tsx";
import { RootLayout } from "./layout/root-layout/root-layout.tsx";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        Component: RootLayout,
        children: [],
      },
    ],
  },
]);
