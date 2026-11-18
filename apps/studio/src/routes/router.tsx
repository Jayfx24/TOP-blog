import App from "@/App";
import { EditorPage } from "@/features/editor/editor-page";
import { PostsPage } from "@/features/post/page/posts-page";
import { createBrowserRouter, Navigate } from "react-router";
import AuthLayout from "@/layouts/Auth/AuthLayout";
import LoginForm from "@/components/Auth/LoginForm/loginForm";
import MainLayout from "@/layouts/MainLayout/mainLayout";
import StudioService from "@/StudioService";
import { PublicRoutes } from "@blog/features";
import { ProtectedRoutes } from "@blog/features";
import RegisterForm from "@/components/Auth/RegisterForm/registerForm";

const allPostLoader = async () => {
  return { records: await StudioService.getUserPosts() };
};


const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        Component: PublicRoutes,
        children: [
          { index: true, element: <Navigate to="/login" replace /> },
          {
            Component: AuthLayout,
            children: [
              { path: "login", Component: LoginForm },
              { path: "register", Component: RegisterForm },
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
