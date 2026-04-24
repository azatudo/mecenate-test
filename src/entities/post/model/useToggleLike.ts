import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleLike } from '../api/toggleLike';

export const useToggleLike = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleLike(postId),
    onSuccess: (data) => {
      queryClient.setQueryData(['post', postId], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          likesCount: data.likesCount,
          isLiked: data.isLiked,
        };
      });
    },
  });
};