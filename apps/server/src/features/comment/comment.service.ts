import { db } from "#lib/prisma.js";
import type { TComment, TCommentInput } from "@blog/lib";
import type {
  CommentBase,
  CommentCreateInput,
  CommentUpdateInput,
} from "./comment.schemas.js";

async function createComment(data: TCommentInput) {
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

async function deleteComment(id: CommentUpdateInput["id"]) {
  return await db.comment.delete({
    where: {
      id,
    },
  });
}
async function getComment(id: TComment["id"]): Promise<TComment | null> {
  /**
   * Returns single comment
   */
  return await db.comment.findUnique({
    where: {
      id,
    },
  });
}
async function getAllComments(cursor?: TComment["id"]): Promise<TComment[]> {
  /**
   * Does not include comments
   */
  // REVIEW

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
// Individual post will induce their comment
// async function getPostComments(
//   postId: TComment["postId"],
// ): Promise<TComment[]> {
//   /**
//    * Does not include comments
//    */

//   return await db.comment.findMany({
//     where: {
//       postId,
//     },
//     orderBy: {
//       createdAt: "asc",
//     },
//   });
// }
// async function getUserComments(authorId: number): Promise<CommentBase[]> {
//   /**
//    * Does not include comments
//    */
//   return await db.comment.findMany({
//     where: {
//       authorId,
//     },
//   });
// }

const CommentService = {
  createComment,
  updateComment,
  deleteComment,
  getComment,
  getAllComments,
  // getPostComments
  // getUserComments,
};

export default CommentService;
