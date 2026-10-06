import { type ReactNode } from "react";
import styles from "./dropdown.module.css";
import clsx from "clsx";
import { EllipsisVertical } from "lucide-react";
import { IconButton } from "../IconButton/icon-button";

interface DropdownProps {
  children: ReactNode;
}
export const Dropdown = ({ children }: DropdownProps) => {
  return (
    <div className={styles.base}>
      <IconButton emphasis={"minimal"}>
        <EllipsisVertical />
      </IconButton>
      <div className={clsx(styles.content)}>{children}</div>
    </div>
  );
};
