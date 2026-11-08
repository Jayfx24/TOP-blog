import { useLoaderData, useSearchParams } from "react-router";
import type { articlesLoader } from "../../loaders";
import { ArticleList } from "../../components/article-list/article-list";
import styles from "./home.module.css";
import { useEffect, useState } from "react";
import { Button } from "@blog/ui";

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const posts = useLoaderData<typeof articlesLoader>();

  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = 11;
  const totalPage = Math.ceil(posts.length / pageCount);
  const currentPosts = posts.slice(
    (currentPage - 1) * pageCount,
    currentPage * pageCount,
  );

  useEffect(() => {
    const handlePageChange = () => {
      setSearchParams((prev) => {
        // const params = new URLSearchParams(prev)
        if (currentPage === 1) {
          prev.delete("page");
        } else {
          prev.set("page", currentPage.toLocaleString());
        }
        return prev;
      });
    };
    handlePageChange();
  }, [currentPage, setSearchParams]);
  return (
    <section >
      <div className="wrapper">
        <div className={styles.base}>
          <div className={styles.hero}>
            <span className={styles.badge}>My Journal</span>
            <h1 className={styles.title}>Inside designs: Stories</h1>
            <p className={styles.desc}>
              Subscribe for the latest design trends. design software releases.
              exclusive interviews with design leaders.
            </p>
          </div>
          <div className={styles.list}>
            <ul className="tags">
              <li>Games</li>
              <li>Lifestyle</li>
              <li>tech</li>
            </ul>
            <div className={styles.content}>
              <ArticleList articles={currentPosts} />
              <div className={styles.btnGroup}>
                <Button
                  disabled={currentPage <= 1}
                  variant={"minimal"}
                  onClick={() => {
                    setCurrentPage(currentPage - 1);
                  }}
                >
                  Previous
                </Button>
                <Button
                  disabled={currentPage === totalPage}
                  variant={"minimal"}
                  // size={}
                  onClick={() => {
                    setCurrentPage(currentPage + 1);
                  }}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
