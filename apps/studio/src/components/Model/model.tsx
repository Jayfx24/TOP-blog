import { Button } from "@blog/ui";
import type { ReactNode } from "react";
import styles from "./model.module.css"

export interface ModelProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
  title: string;
  description: string;
  children?: ReactNode;
  onAction: () => void;
  onActionText: string;
  onCancel: () => void;
  onCancelText: string;
}
export const Model: React.FC<ModelProps> = ({
  title,
  description,
  onActionText,
  onCancelText,
  onAction,
  onCancel,
  children,
  ...props
}) => {
  return (
    <dialog {...props} className={styles.base}>
      <div className="backdrop"></div>
      <div className="content">
        <div className="header">
          <h1>{title}</h1>
          <span>{description}</span>
        </div>
        {children && <div className="content">{children}</div>}
        <div className="actions">
          {onCancel && <Button onClick={onCancel}>{onCancelText}</Button>}
          {onAction && <Button onClick={onAction}>{onActionText}</Button>}
        </div>
      </div>
    </dialog>
  );
};
