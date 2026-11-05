import { Outlet } from "react-router";
import styles from "./root-layout.module.css";

export function RootLayout() {
  return (
    <section className={styles.base}>
      <header></header>
      {/* separator */}
      {/*badge and hero text */}
      {/* separator */}

      <Outlet />
    </section>
  );
}
