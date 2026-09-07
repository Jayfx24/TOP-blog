import type { ReactNode } from "react";

export default function Layout(children: ReactNode) {
  return <section className="layout">{children}</section>;
}
