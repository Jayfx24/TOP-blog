import { db } from "#lib/prisma.js";
import type {
  PostCreatePayload,
  PostUpdatePayload,
  PostResponsePayload,
} from "@blog/lib";

async function createPost(
  data: PostCreatePayload,
): Promise<PostResponsePayload> {
  /**
   * Check for published - its is not optional
   */
  return await db.post.create({
    data,
  });
}

async function updatePost({
  id,
  ...data
}: PostUpdatePayload): Promise<PostResponsePayload> {
  return await db.post.update({
    where: {
      id,
    },
    data,
  });
}

async function deletePost(authorId: number, id: number) {
  return await db.post.delete({
    where: {
      authorId,
      id,
    },
  });
}
async function getPost(id: number) {
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
async function getAllPosts(cursor?: number): Promise<PostResponsePayload[]> {
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
async function getUserPosts(authorId: number) {
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
const PostService = {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPosts,
  getUserPosts,
};

export default PostService;
