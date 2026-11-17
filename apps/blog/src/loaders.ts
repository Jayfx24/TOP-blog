import type {
  PostsWithAuthor,
  PostsWithAuthorAndComment,
  TComment,
} from "@blog/lib";
import { blogService } from "./blogService";
import { faker } from "@faker-js/faker";
import type { LoaderFunctionArgs } from "react-router";

function dummyPost(): PostsWithAuthor {
  return {
    id: faker.string.uuid(),
    title: faker.book.title(),
    content: faker.lorem.paragraphs(),
    authorId: faker.number.int(),
    published: true,
    createdAt: faker.date.recent({ days: 10 }),
    updatedAt: faker.date.recent({ days: 3 }),
    author: {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    },
  };
}

// export const ZComment = z.object({
//   id: z.uuid(),
//   name: z.string().trim().min(2).max(20),
//   content: z.string().trim(),
//   postId: z.uuid(),
//   createdAt: z.date(),
//   updatedAt: z.date(),
// });

function dummyComment(): TComment {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    content: faker.lorem.paragraphs(),
    postId: faker.string.uuid(),
    createdAt: faker.date.recent({ days: 10 }),
    updatedAt: faker.date.recent({ days: 3 }),
  };
}
const posts = faker.helpers.multiple(dummyPost, { count: 15 });
const comments = faker.helpers.multiple(dummyComment, { count: 15 });

// export async function articlesLoader() {
//   // return await blogService.getPosts();
//   return posts;
// }

export async function articlesLoader(): Promise<PostsWithAuthor[]> {
  return await blogService.getPosts();
}

// export async function detailsLoader({ params }: LoaderFunctionArgs) {
//   // return await blogService.getPosts();
//   ;
//   return{ article:dummyPost(), comments};
// }

export async function detailsLoader({
  params,
}: LoaderFunctionArgs): Promise<PostsWithAuthorAndComment> {
  return await blogService.getPost(params.id);
  // ;
  // return{ article:dummyPost(), comments};
}
