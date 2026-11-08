// get all blogs and render


// import { usePosts } from "../../hooks/usePosts";
import { ArticleCard } from "../article-card/article-card";
import styles from "./article-list.module.css";
import clsx from "clsx";
import type { PostsWithAuthor } from "@blog/lib";
interface ArticleListProps {
  articles: PostsWithAuthor[]
}
export function ArticleList({articles}:ArticleListProps) {
  // get all posts
  
  return (
    <div className="wrapper">
      <section className={styles.base}>
        <div className="tags">
          <li>Games</li>
          <li>Lifestyle</li>
          <li>tech</li>
        </div>
        <section >
          <ul className={styles.list}>
            {articles?.map((article, index) => (
              <li key={article.id} className={clsx(index === 0 && styles.span)}>
                <ArticleCard article={article} featured={index === 0} />
              </li>
            ))}
          </ul>
        </section>
      </section>
    </div>
  );
}
