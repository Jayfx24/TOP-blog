import { db } from "#lib/prisma.js";
import type {
  CommentBase,
  CommentCreateInput,
  CommentUpdateInput,
} from "./comment.schemas.js";

async function createComment(data: CommentCreateInput) {
  return await db.comment.create({
    data,
  });
}

async function updateComment({ id, ...data }: CommentUpdateInput) {
  return await db.comment.update({
    where: {
      id,
    },
    data,
  });
}

async function deleteComment(authorId: number, id: number) {
  return await db.comment.delete({
    where: {
      authorId,
      id,
    },
  });
}
async function getComment(id: number): Promise<CommentBase | null> {
  /**
   * Returns single comment
   */
  return await db.comment.findUnique({
    where: {
      id,
    },
  });
}
async function getAllComments(cursor?: number): Promise<CommentBase[]> {
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

//   async function  getPostComments(cursor?: number) {
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
async function getUserComments(authorId: number): Promise<CommentBase[]> {
  /**
   * Does not include comments
   */
  return await db.comment.findMany({
    where: {
      authorId,
    },
  });
}

const CommentService = {
  createComment,
  updateComment,
  deleteComment,
  getComment,
  getAllComments,
  getUserComments,
};

export default CommentService;
