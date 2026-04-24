import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleLike } from '../api/toggleLike';

export const useToggleLike = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleLike(postId),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      queryClient.setQueryData(['post', postId], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          isLiked: !old.isLiked,
          likesCount: old.isLiked
            ? old.likesCount - 1
            : old.likesCount + 1,
        };
      });

      queryClient.setQueriesData(
        { queryKey: ['posts'] },
        (old: any) => {
          if (!old?.pages) return old;

          return {
            ...old,
            pages: old.pages.map((page: any) => ({
              ...page,
              posts: page.posts.map((post: any) =>
                post.id === postId
                  ? {
                      ...post,
                      isLiked: !post.isLiked,
                      likesCount: post.isLiked
                        ? post.likesCount - 1
                        : post.likesCount + 1,
                    }
                  : post
              ),
            })),
          };
        }
      );
    },

    onSuccess: (data) => {
      queryClient.setQueryData(['post', postId], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          likesCount: data.likesCount,
          isLiked: data.isLiked,
        };
      });
      queryClient.setQueriesData(
        { queryKey: ['posts'] },
        (old: any) => {
          if (!old?.pages) return old;

          return {
            ...old,
            pages: old.pages.map((page: any) => ({
              ...page,
              posts: page.posts.map((post: any) =>
                post.id === postId
                  ? {
                      ...post,
                      isLiked: data.isLiked,
                      likesCount: data.likesCount,
                    }
                  : post
              ),
            })),
          };
        }
      );
    },
  });
};