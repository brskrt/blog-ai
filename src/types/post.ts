export interface Post {
  id: string;
  title: string;
  date: string;
  content: string;
  author: string;
  slug: string;
  tags?: string[];
} 