import type { VariantProps } from "class-variance-authority";
import { cva, cx } from "class-variance-authority";
import styles from "./button.module.css";

/**
 * Button
 */
// export type ButtonProps = VariantProps<typeof button>;
const button = cva(styles.base, {
  variants: {
    variant: {
      primary: styles.primary,
      secondary: styles.secondary,
      minimal: styles.minimal,
      destruction: styles.destruction,
    },

  },
  defaultVariants: {
    variant: "primary"
  }
});

export interface ButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof button> {}

export const Button: React.FC<ButtonProps> = ({
  className,

  ...props
}) => (
  <button className={button({ className })} disabled={undefined} {...props} />
);
