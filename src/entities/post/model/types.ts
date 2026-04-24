export type Post = {
  id: string;
  tier: 'free' | 'paid';
  title: string;
  preview: string;
  coverUrl?: string;
  likesCount: number;
  commentsCount: number;
  author?: {
    displayName?: string;
    avatarUrl?: string;
  };
};