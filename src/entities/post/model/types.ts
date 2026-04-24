export type Post = {
  id: string;
  tier: 'free' | 'paid';
  title: string;
  body?: string;
  preview: string;
  coverUrl?: string;
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  author?: {
    displayName?: string;
    avatarUrl?: string;
  };
};