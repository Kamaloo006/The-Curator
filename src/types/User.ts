import { z } from "zod";

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    avatar: z.string(),
    avatar_url: z.string().nullable().optional(),
    bio: z.string().nullable().optional(),
    created_at: z.string(),
    updated_at: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
});

export type User = z.infer<typeof UserSchema>;
