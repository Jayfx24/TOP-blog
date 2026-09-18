import z from "zod";

const Post = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  authorId: z.number(),
  published: z.boolean(),
});

const PostCreatePayload = Post.omit({ id: true });
export type PostCreatePayload = z.infer<typeof PostCreatePayload>;


const PostUpdatePayload = PostCreatePayload.partial().and(
  Post.pick({ id: true }),
);
export type PostUpdatePayload = z.infer<typeof PostUpdatePayload>;



const PostResponsePayload = Post.extend({
    createdAt: z.date(),
    updatedAt: z.date(),

})

export type PostResponsePayload = z.infer<typeof PostResponsePayload>;

