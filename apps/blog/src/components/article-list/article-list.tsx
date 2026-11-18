// get all blogs and render

// import { usePosts } from "../../hooks/usePosts";
import { ArticleCard } from "../article-card/article-card";
import styles from "./article-list.module.css";
import clsx from "clsx";
import type { PostsWithAuthor } from "@blog/lib";
interface ArticleListProps {
  articles: PostsWithAuthor[];
}
export function ArticleList({ articles }: ArticleListProps) {
  // get all posts

  return (
    // <div className="wrapper">
    <section >
      <ul className={styles.list}>
        {articles?.map((article) => (
          <li key={article.id} className={clsx(article.featured && styles.span)}>
            <ArticleCard article={article}  />
          </li>
        ))}
      </ul>
    </section>
    // </div>
  );
}
