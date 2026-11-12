import type { TComment } from "@blog/lib";
import styles from "./comment-card.module.css";
import {formatDistanceToNow} from "date-fns"

interface CommentCardProps {
  comment: TComment;
}

export function CommentCard({ comment }: CommentCardProps) {
  return (
    <div className={styles.base}>
      <div className="flex a-center ">
        <h1>{comment.name}</h1> 
        <span className={styles.date}>{formatDistanceToNow(new Date(comment.updatedAt),  {addSuffix: true})}</span>
      </div>
      <p>{comment.content}</p>
    </div>
  );
}
