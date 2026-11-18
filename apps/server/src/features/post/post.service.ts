import { db } from "#lib/prisma.js";
import type {
  PostCreatePayload,
  Post,
  PostUpdatePayload,
  PostResponsePayload,
  PostsWithAuthorAndComment,
} from "@blog/lib";

async function createPost(
  data: PostCreatePayload & Pick<Post, "authorId">,
): Promise<PostResponsePayload> {
  /**
   * Check for published - its is not optional
   */
  // @ts-expect-error - Prisma and zod JSON TYPE compatiblity 

  return await db.post.create({
  // @ts-expect-error - Prisma and zod JSON TYPE compatiblity 
    data,
  });
}

async function updatePost({
  id,
  ...data
}: PostUpdatePayload): Promise<PostResponsePayload> {
  // @ts-expect-error - Prisma and zod JSON TYPE compatiblity 
  return await db.post.update({
    where: {
      id,
    },
  // @ts-expect-error - Prisma and zod JSON TYPE compatiblity 
    data,
  });
}

async function deletePost(authorId: Post["authorId"], id: Post["id"]) {
  return await db.post.delete({
    where: {
      authorId,
      id,
    },
  });
}
async function getPrivatePost(id: Post["id"]) {
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

async function getPublicPost(
  id: Post["id"],
): Promise<PostsWithAuthorAndComment | null> {
  /**
   * Returns single post
   */
  // @ts-expect-error - Prisma and zod JSON TYPE compatiblity 
  return await db.post.findUnique({
    where: {
      
      id,
    },
    include: {
      comments: true,
      author: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });
}
async function getPublicPosts(
  _cursor?: Post["id"] | undefined,
): Promise<PostResponsePayload[]> {
  /**
   * Does not include comments
   */
// @ts-expect-error - Prisma and zod JSON TYPE compatibility 
  return await db.post.findMany({
    take: 10,
    // skip: cursor ? 1 : undefined,
    // cursor: {
    //   id: cursor ?? undefined,
    // },

    orderBy: {
      createdAt: "asc",
    },
    include: {
      author: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
    where:{
      published: true
    }
  });
}

async function getUserPosts(authorId: Post["authorId"]) {
  /**
   * Does not include comments
   */
  return await db.post.findMany({
    where: {
      authorId,
    },
  });
}
async function getUserPost(authorId: Post["authorId"], id: Post["id"]) {
  /**
   * Returns single post for user
   */
  return await db.post.findUnique({
    where: {
      id,
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
  getPrivatePost,
  getPublicPost,
  getPublicPosts,
  getUserPost,
  getUserPosts,
};

export default PostService;
