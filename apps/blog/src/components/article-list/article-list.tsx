// get all blogs and render

import { useLoaderData } from "react-router";
// import { usePosts } from "../../hooks/usePosts";
import { ArticleCard } from "../article-card/article-card";
import { articlesLoader } from "../../loaders";

// interface ArticleListProps {}
export function ArticleList() {
  // get all posts
  const posts = useLoaderData<typeof articlesLoader>();
  return (
    <section>
      <div className="tags">
        <li></li>
        <li></li>
        <li></li>
      </div>
      <section className="articles">
        <ul>
          {posts?.map((article) => (
            <li key={article.id}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
