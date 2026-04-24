import { api } from '../../../shared/api/client';

export const postComment = async ({
  postId,
  text,
}: {
  postId: string;
  text: string;
}) => {
  const res = await api.post(`/posts/${postId}/comments`, { text });
  return res.data.data.comment;
};