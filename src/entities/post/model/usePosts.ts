import { useInfiniteQuery } from '@tanstack/react-query';
import { getPosts } from '../api/getPosts';
import { FeedFilter } from '../../../shared/store/uiStore';

export const usePosts = (filter: FeedFilter) => {
  return useInfiniteQuery({
    queryKey: ['posts', filter],
    queryFn: (ctx) => getPosts({ pageParam: ctx.pageParam ?? null, filter }),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
  });
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleLike } from '../api/toggleLike';

export const useToggleLike = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleLike(postId),

    onSuccess: (data: any) => {
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

      queryClient.setQueryData(['post', postId], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          isLiked: data.isLiked,
          likesCount: data.likesCount,
        };
      });
    },
  });
};