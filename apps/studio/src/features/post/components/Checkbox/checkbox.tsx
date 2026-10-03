import styles from "./checkbox.module.css";

export interface CheckboxProps extends Omit<
  React.HTMLAttributes<HTMLInputElement>,
  "type" | "className"
> {
  label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ ...props }) => (
  <input type="checkbox" className={styles.base} {...props} />
);
