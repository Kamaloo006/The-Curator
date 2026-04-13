export interface Post {
  id: number;
  title: string;
  content: string;
  image: string;
  author: string;
  created_at: string;
  category?: string | null;
  categories:Array<{ id: number; name: string }>;
  likes_count: number;
  author_avatar: string;
  status: 'published'| 'draft'| 'archived'| 'pending'
}