import z from "zod";

export const ZPost = z.object({
  id: z.uuid(),
  title: z.string().min(10, "Title must be at least 10 chars"),
  content:z.string(),
  authorId: z.number(),
  published: z.coerce.boolean(),
});

export type Post = z.infer<typeof ZPost>;

export const ZPostCreatePayload = ZPost.omit({ id: true });
export type PostCreatePayload = z.infer<typeof ZPostCreatePayload>;


export const ZPostUpdatePayload = ZPostCreatePayload.partial().and(
  ZPost.pick({ id: true }),
);
export type PostUpdatePayload = z.infer<typeof ZPostUpdatePayload>;



const ZPostResponsePayload = ZPost.extend({
    createdAt: z.date(),
    updatedAt: z.date(),

})

export type PostResponsePayload = z.infer<typeof ZPostResponsePayload>;

