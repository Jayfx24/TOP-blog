import type { TComment } from "@blog/lib";
import styles from "./comment-card.module.css";

interface CommentCardProps {
  comment: TComment;
}

export function CommentCard({ comment }: CommentCardProps) {
  return (
    <div className={styles.base}>
      <h1>{comment.name}</h1>
      <p>{comment.content}</p>
    </div>
  );
}
