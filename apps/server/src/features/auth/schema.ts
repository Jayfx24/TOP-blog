import { z } from "zod";

/**
 * Pending -
 *
 * Check if username or email already exists
 * Need to make db request from server + debounce
 */
export const UserRegistrationSchema = z
  .object({
    firstName: z.string().trim().toLowerCase().min(3).max(20),
    lastName: z.string().trim().toLowerCase().min(3).max(20),
    username: z.string().min(3).max(20),
    email: z.email(),
    avatarUrl: z.string().optional(),
    pwd: z.string().min(5),
    cPwd: z.string(),
    isAdmin: z.coerce.boolean().default(false),
  })
  .refine((data) => data.pwd === data.cPwd, {
    error: "Passwords don't match",
    path: ["cPwd"],
  });

export type UserRegistrationValues = z.infer<typeof UserRegistrationSchema>;

export const ZLogin = z.object({
  username: z.string().min(3).max(20),
  pwd: z.string(),
});

// export type  TL = z.infer<typeof ZLogin>
