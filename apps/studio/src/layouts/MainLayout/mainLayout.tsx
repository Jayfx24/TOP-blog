// import type { ReactNode } from "react";
import { SideBar } from "@/features/side-bar/sideBar";
import styles from "./mainLayout.module.css";
import { Outlet } from "react-router";
import { useAuth } from "@blog/features";

// interface ILayout {
//   children: ReactNode
// }

export default function MainLayout() {
  const { user } = useAuth();
  return (
    <section className={styles.layout}>
      <SideBar
        avatar="https://placehold.co/600x400"
        fullName={user?.firstName + " " + user?.lastName}
      />
      <Outlet />
    </section>
  );
}
