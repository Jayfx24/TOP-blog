import { z } from "zod";
import DOMPurify from "dompurify";
import { isValidPosition } from "@/lib/tiptap-utils";

// const clean = DOMPurify.sanitize('<b>hello there</b>');
// model Comment {
//   id        String   @id @default(uuid())
//   name      String
//   content   String
//   authorId  Int?
//   postId    String
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
//   author    User?     @relation(fields: [authorId], references: [id])
//   post      Post     @relation(fields: [postId], references: [id])

//   @@map("comments")
// }

export const ZComment = z.object({
  id: z.uuid(),
  name: z.string().trim().min(2).max(20),
  content: z.string().trim(),
  postId: z.uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TComment = z.infer<typeof ZComment>;

export const ZCommentInput = ZComment.omit({
  id: true,
  content: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  content: z
    .string()
    .transform((val) =>
      DOMPurify.sanitize(val, { USE_PROFILES: { html: true } }),
    ),
});
export type TCommentInput = z.infer<typeof ZCommentInput>;
