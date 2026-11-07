import type {  PostsWithAuthor } from "@blog/lib";
import { Link } from "react-router";
import styles from "./article-card.module.css";
import { clsx } from "clsx";
import { faker } from "@faker-js/faker";
interface ArticleCardProps {
  article: PostsWithAuthor;
  featured?: boolean;
}

export function ArticleCard({ article, featured }: ArticleCardProps) {
  const excerptEnd = featured ? 300 : 100;
  const excerpt = article.content.slice(0, excerptEnd) + "...";
  const img = faker.image.urlPicsumPhotos({width:400,height: 300})
  return (
    <article className={clsx(styles.base)}>
    
      <div className={clsx(styles.content, featured && styles.featured)}>
        <img src={img} alt="" />
        <div className={styles.details}>
          <Link to={article.id}>
            <h1 className="title">{article.title}</h1>
          </Link>
          <p className={styles.excerpt}>{excerpt}</p>
          <div className={styles.profile}>
            <div className="profile-img"></div>
            <div className={styles.author}>
              <h2>{article.author.firstName + " " + article.author.lastName}</h2>
              <p>{new Date(article.updatedAt).toDateString()}</p> 
                        </div>
            </div>
        </div>
      </div>
    </article>
  );
}
