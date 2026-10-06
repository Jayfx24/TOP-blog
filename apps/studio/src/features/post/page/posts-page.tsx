// interface PostsPage {
//     children:
// }

import { PostTable } from "../components/table/post-table";
import type { PostResponsePayload } from "@blog/lib";
import { Button } from "@blog/ui";
import { faker } from "@faker-js/faker";
import { useState } from "react";
import styles from "./post-page.module.css";
import clsx from "clsx";

const posts: Array<PostResponsePayload> = Array.from(
  { length: 100 },
  (_, index) => ({
    id: index,
    title: faker.book.title(),
    content: JSON.stringify({ 1: "hello" }),
    authorId: 2,
    published: false,
    createdAt: faker.date.past({ years: 1 }),
    updatedAt: faker.date.recent(),
  }),
);

export function PostsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = 10;
  const totalPage = Math.ceil(posts.length / pageCount);
  const currentPosts = posts.slice(
    (currentPage - 1) * pageCount,
    currentPage * pageCount,
  );
  return (
    <div className={clsx(styles.wrapper,"container")}>
      <PostTable posts={currentPosts} />
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
  );
}
