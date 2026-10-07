import App from "@/App";
import { EditorPage } from "@/features/editor/editor-page";
import { PostsPage } from "@/features/post/page/posts-page";
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
      {
        path: "posts",

        children: [
          { index: true, Component: PostsPage },
          { path: ":id/edit", Component: EditorPage },
        ],
      },
      {
        path: "new",
        Component: EditorPage,
      },
    ],
  },
  // but in protected routes
]);

export default router;
