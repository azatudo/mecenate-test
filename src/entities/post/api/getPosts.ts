import { api } from '../../../shared/api/client';
import { FeedFilter } from '../../../shared/store/uiStore';

type GetPostsParams = {
  pageParam: string | null;
  filter: FeedFilter;
};

export const getPosts = async ({ pageParam, filter }: GetPostsParams) => {
  const res = await api.get('/posts', {
    params: {
      cursor: pageParam,
      limit: 10,
      ...(filter !== 'all' && { tier: filter }),
    },
  });

  return res.data.data;
};