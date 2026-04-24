import { api } from '../../../shared/api/client';

export const toggleLike = async (postId: string) => {
  const res = await api.post(`/posts/${postId}/like`);
  return res.data.data;
};