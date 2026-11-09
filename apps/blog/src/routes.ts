import { createBrowserRouter } from "react-router";
import App from "./App.tsx";
import { RootLayout } from "./layout/root-layout/root-layout.tsx";
import { articlesLoader, detailsLoader } from "./loaders.ts";
import { Home } from "./pages/home/home.tsx";
import { Details } from "./pages/details/details.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        Component: RootLayout,
        children: [
          { index: true, loader: articlesLoader, Component: Home },
          { path:"blog/:id" ,loader: detailsLoader, Component: Details },
        ],
      },
    ],
  },
]);

