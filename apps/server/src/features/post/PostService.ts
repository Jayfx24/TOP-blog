import { db } from "#lib/prisma.js";
import type {
  PostBase,
  PostCreateInput,
  PostUpdateInput,
} from "./postSchemas.js";

export default class PostService {
  static async createPost(data: PostCreateInput) {
    /**
     * Check for published - its is not optional
     */
    return await db.post.create({
      data,
    });
  }

  static async updatePost({ id, ...data }: PostUpdateInput) {
    return await db.post.update({
      where: {
        id,
      },
      data,
    });
  }

  static async deletePost(authorId: number, id: number) {
    return await db.post.delete({
      where: {
        authorId,
        id,
      },
    });
  }
  static async getPost(id: number) {
    /**
     * Returns single post
     */
    return await db.post.findUnique({
      where: {
        id,
      },
      include: {
        comments: true,
      },
    });
  }
  static async getAllPosts(cursor?: number): Promise<PostBase[]> {
    /**
     * Does not include comments
     */

    return await db.post.findMany({
      take: 10,
      skip: cursor ? 1 : undefined,
      cursor: {
        id: cursor,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }
  static async getUserPosts(authorId: number) {
    /**
     * Does not include comments
     */
    return await db.post.findMany({
      where: {
        authorId,
      },
      include: {
        comments: true,
      },
    });
  }
}
