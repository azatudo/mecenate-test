import { api } from '../../../shared/api/client';

export const getComments = async ({
  postId,
  pageParam = null,
}: {
  postId: string;
  pageParam: string | null;
}) => {
  const res = await api.get(`/posts/${postId}/comments`, {
    params: {
      cursor: pageParam,
      limit: 20,
    },
  });
  return res.data.data;
};