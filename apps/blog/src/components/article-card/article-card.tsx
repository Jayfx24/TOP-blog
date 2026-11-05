import type { PostResponsePayload, PostsWithAuthor } from "@blog/lib";
import { Link } from "react-router";
import styles from "./article-card.module.css";
import { clsx } from "clsx";
interface ArticleCardProps {
  article: PostsWithAuthor;
  featured?: boolean;
}

export function ArticleCard({ article, featured }: ArticleCardProps) {
  const excerptEnd = featured ? 300 : 100;
  const excerpt = article.content.slice(0, excerptEnd) + "...";
  return (
    <article className={clsx(styles.base, featured && styles.feature)}>
      <div className="image"></div>
      <div className="details">
        <Link to={article.id}>
          <h1 className="title">{article.title}</h1>
        </Link>
        <p>{excerpt}</p>
        <div className="profile">
          <div className="profile-img"></div>
          <h2>{article.author.firstName + " " + article.author.lastName}</h2>
          <p>{new Date(article.updatedAt).toDateString()}</p> // should be last
          updated
        </div>
      </div>
    </article>
  );
}
