// import type { PostsWithAuthor } from "@blog/lib";
import { useLoaderData } from "react-router";
import { detailsLoader } from "../../loaders";
import styles from "./details.module.css";
import { CommentEditor } from "@/components/comment-editor/comment-editor";
// interface DetailsProps {
//   article: PostsWithAuthor; //should be with comment
// }

export function Details() {
  const article = useLoaderData<typeof detailsLoader>();
  return (
    <section>
      <div className="wrapper">
        <span className={styles.badge}>Back to journal -</span>
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
            <span className={styles.value}>{article.updatedAt.toDateString()}</span>
          </li>
        </ul>
      </div>

      <div className={styles.imgWrapper}><img src="https://placehold.co/1250x628" alt="" /></div>
      <div className="wrapper">
        <div className={styles.content}>{article.content}</div>

        <div className="comment">
          <div className="header">
            <h2>Comment</h2>
            <p>In this section you can contribute and read other readers comment on this article</p>
          </div>
          <div className="content">
            <CommentEditor postId={article.id} />
          </div>

        </div>
      </div>

    </section>
  );
}
