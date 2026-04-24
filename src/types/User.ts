export interface User{
    id: number;
    name: string;
    email: string;
    avatar:string;
    avatar_url?: string | null;
    bio?: string | null;
    created_at: string;
    updated_at: string;
    password:string;
    password_confirmation:string;
}
