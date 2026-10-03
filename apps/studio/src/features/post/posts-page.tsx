// interface PostsPage {
//     children:
// }

import { PostTable } from "./components/table/post-table";
import type { PostResponsePayload } from "@blog/lib";
import { faker } from "@faker-js/faker";

const posts: Array<PostResponsePayload> = Array.from(
  { length: 15 },
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
  return (
    <>
      <PostTable posts={posts} />
    </>
  );
}
