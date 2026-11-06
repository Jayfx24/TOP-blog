import clsx from "clsx";
import styles from "./separator.module.css";

interface SeparatorProps {
  isVertical?: boolean;
}

export function Separator({ isVertical }: SeparatorProps) {
  return <hr className={clsx(styles.base, isVertical && styles.vertical)} />;
}
