import type { PostsWithAuthor } from "@blog/lib";
import { Link } from "react-router";
import styles from "./article-card.module.css";
import { clsx } from "clsx";
import { faker } from "@faker-js/faker";
import DOMPurify from "dompurify";

interface ArticleCardProps {
  article: PostsWithAuthor;
  featured?: boolean;
}

export function ArticleCard({ article, featured }: ArticleCardProps) {
  const excerptEnd = featured ? 300 : 100;
  const excerpt = article.content.slice(0, excerptEnd) + "...";
  // DOMPurify.
  // const img = faker.image.url({ width: 400, height: 250 });
  return (
    <article className={clsx(styles.base)}>
      <div className={clsx(styles.content, featured && styles.featured)}>
        <img src={article.featuredUrl ?? "https://placehold.co/400x250/png"} alt="" />
        <div className={styles.details}>
          <Link to={`blog/${article.id}`} className={styles.link}>
            <h1 className="title">{article.title}</h1>
          </Link>
          <div className={styles.excerpt}>{excerpt}</div>
          <div className={styles.profile}>
            <img className="rounded" src="https://placehold.co/20x20/png" />
            <div className={styles.author}>
              <h2>
                {article.author.firstName + " " + article.author.lastName}
              </h2>
              <p>{new Date(article.updatedAt).toDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
