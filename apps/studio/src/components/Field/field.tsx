import { cva, type VariantProps } from "class-variance-authority";
import styles from "./field.module.css";
import type { LucideIcon } from "lucide-react";

const field = cva(styles.base, {
  variants: {
    variant: {
      info: styles.info,
      warning: styles.warning,
      error: styles.error,
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

export interface FieldProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof field> {
  label: string[];
  icon?: LucideIcon;
}

export const Field: React.FC<FieldProps> = ({ label, icon: Icon, variant }) => {

  return (
    <div className={field({ variant })}>
      {Icon && <Icon size={12} />}
      <span>{label}</span>
    </div>
  );
};
