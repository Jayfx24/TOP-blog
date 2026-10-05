// import type { VariantProps } from "class-variance-authority";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import styles from "./input.module.css";

const input = cva(styles.base, {
  variants: {
    variant: {
      fixed: styles.fixed,
      flexible: styles.flexible,
    },
  },
  defaultVariants: {
    variant: "flexible",
  },
});
export interface InputProps
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof input> {
  hasError?: boolean;
}

export const Input: React.FC<InputProps> = ({
  placeholder,
  type = "text",
  variant,
  ...props
}) => (
  <input
    type={type}
    className={input({ variant })}
    placeholder={placeholder}
    {...props}
  />
);
