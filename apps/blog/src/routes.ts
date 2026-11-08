import { createBrowserRouter } from "react-router";
import App from "./App.tsx";
import { RootLayout } from "./layout/root-layout/root-layout.tsx";
import { articlesLoader } from "./loaders.ts";
import { Home } from "./pages/home/home.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        Component: RootLayout,
        children: [
          { index: true, loader: articlesLoader, Component: Home },
        ],
      },
    ],
  },
]);

