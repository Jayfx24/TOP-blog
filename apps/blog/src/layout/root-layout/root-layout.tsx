import { Outlet } from "react-router";
import styles from "./root-layout.module.css";
import clsx from "clsx";
import { Book } from "lucide-react";
// import { Separator } from "../../components/separator/separator";

export function RootLayout() {
  return (
    <section className={styles.base}>
      <header className={clsx("wrapper flex a-center", styles.header)}>
        <Book />
        Urs
      </header>
      {/* separator */}
      {/* <Separator /> */}
      {/*badge and hero text */}
      {/* separator */}

      <Outlet />

      <footer className={clsx("wrapper flex a-center", styles.footer)}>
        <a href="">@Jay24</a>
      </footer>
    </section>
  );
}
