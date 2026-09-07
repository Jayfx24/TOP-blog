import type { ReactNode } from "react";

interface ILayout {
  children: ReactNode
}

export default function Layout({children}: ILayout) {
  return <section className="layout">{children}</section>;
}
