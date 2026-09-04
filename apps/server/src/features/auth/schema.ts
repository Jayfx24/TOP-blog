import { z } from "zod";

export const UserRegistrationSchema = z
  .object({
    firstName: z.string().trim().toLowerCase().min(3).max(20),
    lastName: z.string().trim().toLowerCase().min(3).max(20),
    username: z.string().min(3).max(20),
    email: z.email(),
    avatarUrl: z.string().optional(),
    pwd: z.string().min(8),
    cPwd: z.string(),
  })
  .refine((data) => data.pwd === data.cPwd, {
    error: "Passwords don't match",
    path: ["cPwd"], // path of error
  });

export type UserRegistrationValues = z.infer<typeof UserRegistrationSchema>