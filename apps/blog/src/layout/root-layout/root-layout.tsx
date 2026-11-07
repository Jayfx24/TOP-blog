import { Outlet } from "react-router";
import styles from "./root-layout.module.css";
import { Separator } from "../../components/separator/separator";

export function RootLayout() {
  return (
    <section className={styles.base}>
      <header>HEADER-BASE</header>
      {/* separator */}
      <Separator />
      {/*badge and hero text */}
      {/* separator */}

      <Outlet />
    </section>
  );
}
