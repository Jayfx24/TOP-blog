import { cva, type VariantProps } from "class-variance-authority";
import styles from "./checkbox.module.css";

const checkbox = cva(styles.base, {
  variants: {
    variant: {
      default: styles.base,
      error: styles.error,
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export interface CheckboxProps
  extends
    Omit<React.HTMLAttributes<HTMLInputElement>, "type" | "className">,
    VariantProps<typeof checkbox> {
  label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ variant, ...props }) => (
  <input type="checkbox" className={checkbox({ variant })} {...props}  />
);
