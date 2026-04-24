import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const WS_URL = 'wss://k8s.mectest.ru/test-app/ws?token=550e8400-e29b-41d4-a716-446655440000';

export const useWebSocket = (postId?: string) => {
  const queryClient = useQueryClient();
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const connect = () => {
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);

          if (msg.type === 'like_updated') {
            if (postId && msg.postId === postId) {
              queryClient.setQueryData(['post', postId], (old: any) => {
                if (!old) return old;
                return { ...old, likesCount: msg.likesCount };
              });
            } else if (!postId) {
              queryClient.setQueryData(['posts'], (old: any) => {
                if (!old?.pages) return old;
                return {
                  ...old,
                  pages: old.pages.map((page: any) => ({
                    ...page,
                    posts: page.posts.map((post: any) =>
                      post.id === msg.postId
                        ? { ...post, likesCount: msg.likesCount }
                        : post
                    ),
                  })),
                };
              });
            }
          }

          if (msg.type === 'comment_added') {
            if (postId && msg.postId === postId) {
              queryClient.setQueryData(['comments', postId], (old: any) => {
                if (!old) return old;
                const firstPage = old.pages[0];
                const exists = firstPage.comments.some(
                  (c: any) => c.id === msg.comment.id
                );
                if (exists) return old;
                return {
                  ...old,
                  pages: [
                    {
                      ...firstPage,
                      comments: [msg.comment, ...firstPage.comments],
                    },
                    ...old.pages.slice(1),
                  ],
                };
              });

              queryClient.setQueryData(['post', postId], (old: any) => {
                if (!old) return old;
                return {
                  ...old,
                  commentsCount: old.commentsCount + 1,
                };
              });
            } else if (!postId) {
              queryClient.setQueryData(['posts'], (old: any) => {
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
              });
            }
          }
        } catch (e) {
          console.error('WS parse error', e);
        }
      };

      ws.onclose = () => {
        setTimeout(connect, 3000);
      };

      ws.onerror = (e) => {
        console.error('WS error', e);
        ws.close();
      };
    };

    connect();

    return () => {
      wsRef.current?.close();
    };
  }, [postId]);
};