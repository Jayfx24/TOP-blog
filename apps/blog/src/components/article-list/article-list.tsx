// get all blogs and render

import { useLoaderData } from "react-router";
// import { usePosts } from "../../hooks/usePosts";
import { ArticleCard } from "../article-card/article-card";
import { articlesLoader } from "../../loaders";
import styles from "./article-list.module.css";
import clsx from "clsx";
// interface ArticleListProps {}
export function ArticleList() {
  // get all posts
  const posts = useLoaderData<typeof articlesLoader>();
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
            {posts?.map((article, index) => (
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
