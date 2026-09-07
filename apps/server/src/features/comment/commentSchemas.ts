import { z } from "zod";

export const CommentBaseSchema = z.object({
  id: z.number(),
  content: z.string().trim(),
  authorId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  postId: z.number(),

});

export type CommentBase = z.infer<typeof CommentBaseSchema>;

export const CommentCreateSchema = CommentBaseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CommentCreateInput = z.infer<typeof CommentCreateSchema>;

export const CommentUpdateSchema = CommentCreateSchema.omit({
  authorId: true,
  postId: true
})
  .partial()
  .and(CommentBaseSchema.pick({ id: true }));

export type CommentUpdateInput = z.infer<typeof CommentUpdateSchema>;
