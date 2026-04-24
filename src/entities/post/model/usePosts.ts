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