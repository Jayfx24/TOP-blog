import { z } from "zod";

export const PostBaseSchema = z.object({
  id: z.number(),
  content: z.string().trim(),
  authorId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  title: z.string(),
  published: z.boolean(),
});

export type PostBase = z.infer<typeof PostBaseSchema>;

export const PostCreateSchema = PostBaseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type PostCreateInput = z.infer<typeof PostCreateSchema>;

export const PostUpdateSchema = PostCreateSchema.omit({
  authorId: true,
})
  .partial()
  .and(PostBaseSchema.pick({ id: true }));

export type PostUpdateInput = z.infer<typeof PostUpdateSchema>;
