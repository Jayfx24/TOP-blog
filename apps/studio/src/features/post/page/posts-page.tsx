import { PostTable } from "../components/table/post-table";
import type { PostResponsePayload } from "@blog/lib";
import { Button } from "@blog/ui";

import { useState } from "react";
import styles from "./post-page.module.css";
import clsx from "clsx";
import StudioService from "@/StudioService";
import { useLoaderData } from "react-router";


export function PostsPage() {
  const { records } = useLoaderData();
  const [posts, setPosts] = useState<PostResponsePayload[]>(
    records ,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = 10;
  const totalPage = Math.ceil(posts.length / pageCount);
  const currentPosts = posts.slice(
    (currentPage - 1) * pageCount,
    currentPage * pageCount,
  );

  const handlePublish = async (
    id: PostResponsePayload["id"],
    currentStatus: boolean,
  ) => {
    const publishing = !currentStatus;
    const updated = await StudioService.updatePost({
      id,
      published: publishing,
    });

    setPosts((prev) => prev.map((p) => (updated.id === p.id ? updated : p)));
  };

  const handleDelete = async (id: PostResponsePayload["id"]) => {
    const updated = await StudioService.deletePost(id);

    setPosts((prev) => prev.filter((p) => updated.id !== p.id));
  };

  return (
    <div className={clsx(styles.wrapper, "container")}>
      <PostTable
        posts={currentPosts}
        handlePublish={handlePublish}
        handleDelete={handleDelete}
      />
      <div className={styles.btnGroup}>
      { currentPage > 1 &&  <Button
          disabled={currentPage <= 1}
          variant={"minimal"}
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
        >
          Previous
        </Button>}

       {totalPage > 1 && <Button
          disabled={currentPage === totalPage}
          variant={"minimal"}
          // size={}
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          Next
        </Button>}
      </div>
    </div>
  );
}
