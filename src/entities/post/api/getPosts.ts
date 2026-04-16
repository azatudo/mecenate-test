import { api } from '../../../shared/api/client';

export const getPosts = async ({ pageParam = 1 }) => {
  const res = await api.get(`/posts?page=${pageParam}`);
  return res.data;
};