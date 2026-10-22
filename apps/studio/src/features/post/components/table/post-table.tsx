/**
 * 
 *  - The JSON to display 
 * should have filter 
 * 
 * inspiration
 * 
 * export const features = tableFeatures({
 
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: { includesString: filterFn_includesString },
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },

 */
import { Button } from "@blog/ui";

import styles from "./post-table.module.css";
import type { PostResponsePayload } from "@blog/lib";
// import { Checkbox } from "@blog/ui";
import { Pen, Send, X } from "lucide-react";
// import { useState } from "react";
import { Dropdown } from "../Dropdown/dropdown";
// import { IconButton } from "../IconButton/icon-button";
import clsx from "clsx";
import { Link } from "react-router";
// import { Checkbox } from "../Checkbox/checkbox";

/**
 * Post table
 *
 * Input:
 *  posts
 *
 * DESIGN:
 *
 *  title,
 *  updated
 *  status
 *  actions - edit, preview : get from client / ui, publish/unpublish, delete
 *
 *
 *
 */
type PostTable = {
  posts: Array<PostResponsePayload>;
  handlePublish: (
    id: PostResponsePayload["id"],
    currentStatus: boolean,
  ) => void;
  handleDelete: (id: PostResponsePayload["id"]) => void;
};

export function PostTable({ posts, handlePublish, handleDelete }: PostTable) {


  const headers = ["title", "updated", "status", "actions"];

  return (
    <article className={styles.tw}>
      <table className={styles.base}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th className={clsx(styles.th)} key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              {/* <td className={styles.td}>
                {
                  <Checkbox
                    onClick={(e) => {
                      const isChecked = e.currentTarget.checked;

                      if (!isChecked) {
                        return setSelected((prev) =>
                          prev.filter((item) => item.id !== post.id),
                        );
                      }

                      setSelected((prev) => [...prev, post]);
                    }}
                  />
                }
              </td> */}
              <td className={styles.td}>{post.title}</td>
              <td className={styles.td}>{new Date(post.updatedAt)?.toDateString()}</td>
              <td className={styles.td}>
                {post.published ? "active" : "not-active"}
              </td>

              <td className={styles.td}>
                <Dropdown>
                  {/* <a href="">edit</a> */}
                  <Link
                    to={`${post.id}/edit`}
                    state={{  post }}
                    className="row"
                  >
                    <Pen size={16} />
                    Edit
                  </Link>
                  <Button
                    variant={"minimal"}
                    className="row"
                    onClick={() => handlePublish(post.id, post.published)}
                  >
                    <Send size={16} />
                    {post.published ? "Unpublish": "Publish"}
                  </Button>

                  <Button
                    variant={"destruction"}
                    className="row"
                    onClick={() => handleDelete(post.id)}
                  >
                    <X size={16} />
                    Delete
                  </Button>
                </Dropdown>
                {/* <EllipsisVertical size={14} /> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}
