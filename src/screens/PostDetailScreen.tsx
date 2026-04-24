import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Animated,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { PostDetailRouteProp } from '../navigation/types';
import { usePost } from '../entities/post/model/usePost';
import { useComments } from '../entities/post/model/useComments';
import { useToggleLike } from '../entities/post/model/useToggleLike';
import { usePostComment } from '../entities/post/model/usePostComment';
import { useWebSocket } from '../shared/hooks/useWebSocket';
import { colors } from '../shared/theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRef, useState } from 'react';
import * as Haptics from 'expo-haptics';

export const PostDetailScreen = () => {
  const route = useRoute<PostDetailRouteProp>();
  const navigation = useNavigation();
  const { postId } = route.params;

  const { data: post, isLoading: postLoading } = usePost(postId);
  const { data: commentsData, fetchNextPage, isFetchingNextPage } = useComments(postId);
  const { mutate: toggleLike } = useToggleLike(postId);
  const { mutate: sendComment, isPending: isSending } = usePostComment(postId);

  useWebSocket(postId);

  const [commentText, setCommentText] = useState('');
  const likeScale = useRef(new Animated.Value(1)).current;

  const handleLike = () => {
    Animated.sequence([
      Animated.spring(likeScale, { toValue: 1.4, useNativeDriver: true }),
      Animated.spring(likeScale, { toValue: 1, useNativeDriver: true }),
    ]).start();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    toggleLike();
  };

  const handleSendComment = () => {
    const text = commentText.trim();
    if (!text) return;
    sendComment(text);
    setCommentText('');
  };

  const comments = commentsData?.pages.flatMap((p) => p.comments) ?? [];

  if (postLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (!post) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          onEndReached={() => fetchNextPage()}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isFetchingNextPage ? <ActivityIndicator style={{ padding: 16 }} /> : null}
          ListHeaderComponent={
            <View>
              {/* BACK */}
              <Pressable onPress={() => navigation.goBack()} style={styles.back}>
                <Text style={styles.backText}>← Назад</Text>
              </Pressable>

              {/* AUTHOR */}
              <View style={styles.authorRow}>
                {post.author?.avatarUrl && (
                  <Image source={{ uri: post.author.avatarUrl }} style={styles.avatar} />
                )}
                <Text style={styles.authorName}>{post.author?.displayName}</Text>
              </View>

              {/* COVER */}
              {post.coverUrl && (
                <Image source={{ uri: post.coverUrl }} style={styles.cover} />
              )}

              {/* TITLE */}
              <Text style={styles.title}>{post.title}</Text>

              {/* BODY */}
              {post.body ? (
                <Text style={styles.body}>{post.body}</Text>
              ) : (
                <Text style={styles.locked}>🔒 Контент доступен после доната</Text>
              )}

              {/* LIKE */}
              <View style={styles.likeRow}>
                <Pressable onPress={handleLike}>
                  <Animated.View style={[styles.likeButton, { transform: [{ scale: likeScale }] }]}>
                    <Text style={styles.likeIcon}>{post.isLiked ? '❤️' : '🤍'}</Text>
                    <Text style={styles.likeCount}>{post.likesCount}</Text>
                  </Animated.View>
                </Pressable>
              </View>

              {/* COMMENTS HEADER */}
              <Text style={styles.commentsHeader}>
                {post.commentsCount} комментариев
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.comment}>
              <View style={styles.commentHeader}>
                {item.author?.avatarUrl && (
                  <Image source={{ uri: item.author.avatarUrl }} style={styles.commentAvatar} />
                )}
                <Text style={styles.commentAuthor}>{item.author?.displayName}</Text>
              </View>
              <Text style={styles.commentText}>{item.text}</Text>
            </View>
          )}
        />

        {/* INPUT */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Ваш комментарий..."
            placeholderTextColor={colors.muted}
            value={commentText}
            onChangeText={setCommentText}
            multiline
          />
          <Pressable
            style={[styles.sendButton, (!commentText.trim() || isSending) && { opacity: 0.5 }]}
            onPress={handleSendComment}
            disabled={!commentText.trim() || isSending}
          >
            <Text style={styles.sendText}>›</Text>
          </Pressable>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  back: {
    padding: 16,
  },
  backText: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: '500',
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  authorName: {
    fontSize: 15,
    fontWeight: '500',
  },
  cover: {
    width: '100%',
    height: 240,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    color: colors.text,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    paddingHorizontal: 16,
    color: colors.text,
    marginBottom: 16,
  },
  locked: {
    fontSize: 14,
    color: colors.muted,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  likeRow: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  likeIcon: {
    fontSize: 16,
  },
  likeCount: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  commentsHeader: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingBottom: 12,
    color: colors.text,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
  },
  comment: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  commentAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  commentAuthor: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  commentText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    paddingLeft: 36,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.text,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendText: {
    color: colors.background,
    fontSize: 22,
    fontWeight: '700',
  },
});