import { useInfiniteQuery } from '@tanstack/react-query';
import { getPosts } from '../api/getPosts';

export const usePosts = () => {
  return useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
  });
};