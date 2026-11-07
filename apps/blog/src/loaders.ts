import type { PostsWithAuthor } from "@blog/lib";
import { blogService } from "./blogService";
import { faker } from "@faker-js/faker";

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

const posts = faker.helpers.multiple(dummyPost, { count: 15 });
export async function articlesLoader() {
  // return await blogService.getPosts();
  return posts;
}
