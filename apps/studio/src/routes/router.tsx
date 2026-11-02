import App from "@/App";
import { EditorPage } from "@/features/editor/editor-page";
import { PostsPage } from "@/features/post/page/posts-page";
import { createBrowserRouter } from "react-router";
import ProtectedRoutes from "./protectedRoutes";
import AuthLayout from "@/layouts/Auth/AuthLayout";
import LoginForm from "@/components/Auth/LoginForm/loginForm";
import MainLayout from "@/layouts/MainLayout/mainLayout";
import StudioService from "@/StudioService";
import PublicRoutes from "./publicRoutes";

const allPostLoader = async () => {
  return { records: await StudioService.getUserPosts() };
};

// const confirmUpdate = async () => {};
const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        Component: PublicRoutes,
        children: [
          {
            Component: AuthLayout,
            children: [
              { path: "login", Component: LoginForm },
              { path: "register", element: "Register" },
            ],
          },
        ],
      },
      {
        Component: ProtectedRoutes, //use components
        children: [
          {
            Component: MainLayout,

            children: [
              { path: "home", element: "At home" },
              {
                path: "posts",
                children: [
                  { index: true, loader: allPostLoader, Component: PostsPage },
                  { path: ":id/edit", Component: EditorPage },
                ],
              },
              {
                path: "new",
                Component: EditorPage,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
