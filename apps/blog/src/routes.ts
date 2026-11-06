import { createBrowserRouter } from "react-router";
import App from "./App.tsx";
import { RootLayout } from "./layout/root-layout/root-layout.tsx";
import { ArticleList } from "./components/article-list/article-list.tsx";
import { articlesLoader } from "./loaders.ts";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        Component: RootLayout,
        children: [
          { index: true, loader: articlesLoader, Component: ArticleList },
        ],
      },
    ],
  },
]);

