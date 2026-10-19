// interface IAuthLayout{
// children
// }

import { Outlet } from "react-router";
import styles from "./AuthLayout.module.css"
export default function AuthLayout() {
  return (
    <section>
      
        <div  className={styles.base}>
          <Outlet />
      
      </div>
    </section>
  );
}
