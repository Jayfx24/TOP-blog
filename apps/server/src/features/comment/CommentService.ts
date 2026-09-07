import { db } from "#lib/prisma.js";
import type {
  CommentBase,
  CommentCreateInput,
  CommentUpdateInput,
} from "./commentSchemas.js";

export default class CommentService {
  static async createComment(data: CommentCreateInput) {
    return await db.comment.create({
      data,
    });
  }

  static async updateComment({ id, ...data }: CommentUpdateInput) {
    return await db.comment.update({
      where: {
        id,
      },
      data,
    });
  }

  static async deleteComment(authorId: number, id: number) {
    return await db.comment.delete({
      where: {
        authorId,
        id,
      },
    });
  }
  static async getComment(id: number): Promise<CommentBase | null> {
    /**
     * Returns single comment
     */
    return await db.comment.findUnique({
      where: {
        id,
      },
    });
  }
  static async getAllComments(cursor?: number): Promise<CommentBase[]> {
    /**
     * Does not include comments
     */

    return await db.comment.findMany({
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

  //   static async getPostComments(cursor?: number) {
  //   /**
  //    * Does not include comments
  //    */

  //   return await db.comment.findMany({
  //     take: 10,
  //     skip: cursor ? 1 : undefined,
  //     cursor: {
  //       id: cursor,
  //     },
  //     orderBy: {
  //       createdAt: "asc",
  //     },
  //   });
  // }
  static async getUserComments(authorId: number): Promise<CommentBase[]> {
    /**
     * Does not include comments
     */
    return await db.comment.findMany({
      where: {
        authorId,
      },
    });
  }
}
