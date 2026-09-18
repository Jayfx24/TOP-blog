import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import styles from "./button.module.css";


const button = cva(styles.base, {
  variants: {
    variant: {
      primary: styles.primary,
      secondary: styles.secondary,
      minimal: styles.minimal,
      destruction: styles.destruction,
    },
    size:{
      default:styles.size,
      sm: styles.sm
    }

  },
  defaultVariants: {
    variant: "primary",
    size: "default"
  }
});

export interface ButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof button> {}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  ...props
}) => (
  <button className={button({ className, variant,size })} disabled={undefined} {...props} />
);
