import { api } from '../../../shared/api/client';

export const getPost = async (postId: string) => {
  const res = await api.get(`/posts/${postId}`);
  return res.data.data.post;
};