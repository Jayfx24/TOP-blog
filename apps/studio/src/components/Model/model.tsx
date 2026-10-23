import { Button } from "@blog/ui";
import { useEffect, useRef, type ReactNode } from "react";
import styles from "./model.module.css";
import type { LucideIcon } from "lucide-react";

export interface ModelProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
  title: string;
  description: string;
  children?: ReactNode;
  onAction: () => void;
  onActionText: string;
  onCancel: () => void;
  onCancelText: string;
  Icon?: LucideIcon;
}
export const Model: React.FC<ModelProps> = ({
  title,
  description,
  onActionText,
  onCancelText,
  onAction,
  onCancel,
  children,
  Icon,
  ...props
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (dialog && !dialog.open) {
      dialog.showModal();
    }

    return () => {
      if (dialog?.open) dialog?.close();
    };
  }, []);

  return (
    <dialog {...props} className={styles.base} ref={dialogRef}>
      <header className={styles.header}>
        {Icon && <Icon size={24} />}
        <div className={styles.texts}>
          <h1>{title}</h1>
          <span>{description}</span>
        </div>
      </header>
      {children && <div className="content">{children}</div>}
      <div className={styles.actions}>
        {onCancel && (
          <Button variant={"minimal"} onClick={onCancel}>
            {onCancelText}
          </Button>
        )}
        {onAction && <Button onClick={onAction}>{onActionText}</Button>}
      </div>
    </dialog>
  );
};
