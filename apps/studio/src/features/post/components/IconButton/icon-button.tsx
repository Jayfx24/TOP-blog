import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import styles from "./icon-button.module.css";

const iconButton = cva(styles.base, {
  variants: {
    emphasis: {
      medium: styles.medium,
      minimal: styles.minimal,
    },
    size: {
      default: styles.sizeDefault,
      large: styles.large,
    },
  },
  defaultVariants: {
    emphasis: "medium",
    size: "default",
  },
});

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButton> {}

export const IconButton: React.FC<ButtonProps> = ({
  className,
  emphasis,
  size,
  ...props
}) => (
  <button
    className={iconButton({ className, emphasis, size })}
    disabled={undefined}
    {...props}
  />
);
