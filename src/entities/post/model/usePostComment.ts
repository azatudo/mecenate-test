import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postComment } from '../api/postComment';

export const usePostComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (text: string) => postComment({ postId, text }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });
};