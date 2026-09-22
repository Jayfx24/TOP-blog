// import type { VariantProps } from "class-variance-authority";
// import { cva } from "class-variance-authority";
import type React from "react";
import styles from "./input.module.css";

// const _input = cva(styles.base, {
//   variants: {},
// });
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input: React.FC<InputProps> = ({
  placeholder,
  type = "text",
  ...props
}) => (
  <input
    type={type}
    className={styles.base}
    placeholder={placeholder}
    {...props}
  />
);
