import { api } from '../../../shared/api/client';

export const getPosts = async ({ pageParam = null }) => {
  const res = await api.get('/posts', {
    params: {
      cursor: pageParam,
      limit: 10,
    },
  });

  return res.data.data;
};