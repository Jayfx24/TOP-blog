import { z } from "zod";

export const ZUser = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.email(),
  avatarUrl: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TUser = z.infer<typeof ZUser>;

export const ZLoginUser = z.object({
  username: z.string().trim(),
  pwd: z.string(),
});



export type TLoginUser = z.infer<typeof ZLoginUser>

