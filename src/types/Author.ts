import { z } from "zod";

export const AuthorSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    role: z.string(),
    avatar: z.string(),
    bio: z.string(),
});

export type Author = z.infer<typeof AuthorSchema>;