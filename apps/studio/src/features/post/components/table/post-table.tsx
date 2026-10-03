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
import styles from "./post-table.module.css"
import type { PostResponsePayload } from "@blog/lib";

type PostTable = {
  posts: Array<PostResponsePayload>;
};

export function PostTable({ posts }: PostTable) {
  const headers = ["title", "Last updated", "status", "holder", "holder"];

  // const handleSelectRow = () =>{}
  // const filterRow = ()=>{}
  // const paginateRows = ()=>{}

  return (
    <div className={styles.tw}>
      <table className={styles.base}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th className={styles.th} key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td className={styles.td}>{post.title}</td>
              <td className={styles.td}>{post.updatedAt?.toDateString()}</td>
              <td className={styles.td}>{post.published ? "active" : "not-active"}</td>
              <td className={styles.td}>action btn</td>
              <td className={styles.td}>action btn</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
