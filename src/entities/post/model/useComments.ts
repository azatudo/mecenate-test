import { useInfiniteQuery } from '@tanstack/react-query';
import { getComments } from '../api/getComments';

export const useComments = (postId: string) => {
  return useInfiniteQuery({
    queryKey: ['comments', postId],
    queryFn: (ctx) => getComments({ postId, pageParam: ctx.pageParam ?? null }),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
  });
};