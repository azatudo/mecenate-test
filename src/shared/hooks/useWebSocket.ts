import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const WS_URL = 'wss://k8s.mectest.ru/test-app/ws?token=550e8400-e29b-41d4-a716-446655440000';

export const useWebSocket = () => {
  const queryClient = useQueryClient();
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let unmounted = false;

    const connect = () => {
      if (wsRef.current) return;
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);

          console.log('WS EVENT', msg.type, msg.postId);

          if (msg.type === 'like_updated') {
            ['all', 'free', 'paid'].forEach((filter) => {
              queryClient.setQueryData(
                ['posts', filter],
                (old: any) => {
                  if (!old?.pages) return old;
                  return {
                    ...old,
                    pages: old.pages.map((page: any) => ({
                      ...page,
                      posts: page.posts.map((post: any) =>
                        post.id === msg.postId
                          ? {
                              ...post,
                              likesCount: msg.likesCount,
                              isLiked:
                                typeof msg.isLiked === 'boolean'
                                  ? msg.isLiked
                                  : post.isLiked,
                            }
                          : post
                      ),
                    })),
                  };
                }
              );
            });
            queryClient.setQueryData(
              ['post', msg.postId],
              (old: any) => {
                if (!old) return old;
                return {
                  ...old,
                  likesCount: msg.likesCount,
                  isLiked:
                    typeof msg.isLiked === 'boolean'
                      ? msg.isLiked
                      : old.isLiked,
                };
              }
            );
          }

          if (msg.type === 'comment_added') {
            ['all', 'free', 'paid'].forEach((filter) => {
              queryClient.setQueryData(
                ['posts', filter],
                (old: any) => {
                  if (!old?.pages) return old;
                  return {
                    ...old,
                    pages: old.pages.map((page: any) => ({
                      ...page,
                      posts: page.posts.map((post: any) =>
                        post.id === msg.postId
                          ? {
                              ...post,
                              commentsCount: post.commentsCount + 1,
                            }
                          : post
                      ),
                    })),
                  };
                }
              );
            });
            queryClient.setQueryData(
              ['post', msg.postId],
              (old: any) => {
                if (!old) return old;
                return {
                  ...old,
                  commentsCount: old.commentsCount + 1,
                };
              }
            );
          }
        } catch (e) {
          console.error('WS parse error', e);
        }
      };

      ws.onclose = () => {
        wsRef.current = null;

        if (!unmounted) {
          setTimeout(connect, 3000);
        }
      };

      ws.onerror = (e) => {
        console.error('WS error', e);
        ws.close();
      };
    };

    connect();

    return () => {
      unmounted = true;

      if (wsRef.current) {
        wsRef.current.onclose = null;
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, []);
};