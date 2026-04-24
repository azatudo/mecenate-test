import { View, Text, Image, Animated, Pressable } from 'react-native';
import { styles } from './PostCard.styles';
import { Post } from '../model/types';
import { PostCardHeader } from './PostCardHeader';
import { PostCardPaid } from './PostCardPaid';

import { useRef } from 'react';
import * as Haptics from 'expo-haptics';
import { useToggleLike } from '../model/useToggleLike';

export const PostCard = ({ post }: { post: Post }) => {
  const isPaid = post.tier === 'paid';

  const { mutate: toggleLike } = useToggleLike(post.id);
  const likeScale = useRef(new Animated.Value(1)).current;

  const handleLike = () => {
    Animated.sequence([
      Animated.spring(likeScale, {
        toValue: 1.4,
        useNativeDriver: true,
      }),
      Animated.spring(likeScale, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();

    Haptics.impactAsync(
      Haptics.ImpactFeedbackStyle.Medium
    );

    toggleLike();
  };

  return (
    <View style={styles.card}>

      <PostCardHeader author={post.author} />

      {!isPaid && post.coverUrl && (
        <Image
          source={{ uri: post.coverUrl }}
          style={styles.image}
        />
      )}

      {isPaid && <PostCardPaid post={post} />}

      {isPaid && (
        <View style={styles.content}>
          <View style={styles.skeletonTitle} />
          <View style={styles.skeletonLine} />
          <View style={styles.skeletonLineShort} />
        </View>
      )}

      {!isPaid && (
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {post.title}
          </Text>

          <Text style={styles.description} numberOfLines={2}>
            {post.preview}
          </Text>

          <View style={styles.footer}>
            <Pressable
              onPress={(e) => {
                e.stopPropagation();
                handleLike();
              }}
            >
              <Animated.View
                style={[
                  styles.stat,
                  { transform: [{ scale: likeScale }] },
                ]}
              >
                <Text style={styles.icon}>
                  {post.isLiked ? '❤️' : '🤍'}
                </Text>
                <Text style={styles.count}>{post.likesCount}</Text>
              </Animated.View>
            </Pressable>

            <View style={styles.stat}>
              <Text style={styles.icon}>💬</Text>
              <Text style={styles.count}>{post.commentsCount}</Text>
            </View>
          </View>
        </View>
      )}

    </View>
  );
};