import z from "zod";

export const Post = z.object({
  id: z.number(),
  title: z.string().min(10),
  content: z.string().min(10),
  authorId: z.number(),
  published: z.boolean(),
});

export const PostCreatePayload = Post.omit({ id: true , authorId: true});
export type PostCreatePayloadT = z.infer<typeof PostCreatePayload>;


export const PostUpdatePayload = PostCreatePayload.partial().and(
  Post.pick({ id: true }),
);
export type PostUpdatePayload = z.infer<typeof PostUpdatePayload>;



const PostResponsePayload = Post.extend({
    createdAt: z.date(),
    updatedAt: z.date(),

})

export type PostResponsePayload = z.infer<typeof PostResponsePayload>;

