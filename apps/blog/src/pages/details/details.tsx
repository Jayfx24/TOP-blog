// import type { PostsWithAuthor } from "@blog/lib";
import { useLoaderData, useNavigate } from "react-router";
import { detailsLoader } from "../../loaders";
import styles from "./details.module.css";
import { CommentEditor } from "@/components/comment-editor/comment-editor";
import { CommentCard } from "@/components/comment-card/comment-card";
import { Separator } from "@/components/separator/separator";
import { Button } from "@blog/ui";
import { ChevronLeft } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";

export function Details() {
  const { article, comments } = useLoaderData<typeof detailsLoader>();
  const navigate = useNavigate();

  return (
    <section>
      <div className="wrapper">
        <Button
          className={styles.badge}
          variant={"minimal"}
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={14} />
          Back to journal{" "}
        </Button>
        <h1 className={styles.title}>{article.title}</h1>
        <ul className={styles.meta}>
          <li className="author">
            <p className={styles.label}>Written By</p>
            <span className={styles.value}>
              {article.author.firstName + " " + article.author.lastName}
            </span>
          </li>
          <li className="published">
            <p>Published</p>
            <span className={styles.value}>
              {article.updatedAt.toDateString()}
            </span>
          </li>
        </ul>
      </div>

      <div className={styles.imgWrapper}>
        <img src="https://placehold.co/1250x628" alt="" />
      </div>
      <div className="wrapper">
        <div className={styles.content}>{article.content}</div>

        <div className={styles.comment}>
          <Separator />
          <ErrorBoundary fallback={<p>Could not add comment</p>}>
            <CommentEditor postId={article.id} />
          </ErrorBoundary>
          <Separator />
          <div className={styles.views}>
            <div className={styles.header}>
              <h2>Comments </h2>
              <p>
                In this section you can contribute and read other readers
                comment on this article
              </p>
            </div>
            <ul className={styles.commentList}>
              {comments?.map((comment) => (
                <li key={comment.id} id="">
                  <CommentCard comment={comment} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
