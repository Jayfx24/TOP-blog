import { Outlet } from "react-router";
import styles from "./root-layout.module.css";
import clsx from "clsx";
import { Book } from "lucide-react";
// import { Separator } from "../../components/separator/separator";

export function RootLayout() {
  return (
    <section className={styles.base}>
      <header className={clsx(" flex a-center", styles.header)}>
        <div className="wrapper flex a-center">

        <Book />
        Urs
        </div>
      </header>
      {/* separator */}
      {/* <Separator /> */}
      {/*badge and hero text */}
      {/* separator */}

      <Outlet />

      <footer className={clsx(" flex a-center", styles.footer)}>
        <a href="">@Jay24</a>
      </footer>
    </section>
  );
}
