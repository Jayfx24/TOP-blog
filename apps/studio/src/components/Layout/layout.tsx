import type { ReactNode } from "react";
import styles from "./layout.module.css"

interface ILayout {
  children: ReactNode
}

export default function Layout({children}: ILayout) {
  return <section className={styles.layout}>{children}</section>;
}
