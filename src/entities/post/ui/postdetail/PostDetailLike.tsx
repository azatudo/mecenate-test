import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
} from 'react-native';

import { useRef } from 'react';
import * as Haptics from 'expo-haptics';

import { useToggleLike } from '../../model/useToggleLike';
import { colors } from '../../../../shared/theme/colors';

export const PostDetailLike = ({
  post,
  postId,
}: any) => {
  const { mutate: toggleLike } =
    useToggleLike(postId);

  const scale =
    useRef(
      new Animated.Value(1)
    ).current;

  const handleLike = () => {
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 1.4,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
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
    <View style={styles.wrap}>
      <Pressable onPress={handleLike}>
        <Animated.View
          style={[
            styles.likeButton,
            {
              transform: [{ scale }],
            },
          ]}
        >
          <Text>
            {post.isLiked ? '❤️' : '🤍'}
          </Text>

          <Text style={styles.count}>
            {post.likesCount}
          </Text>
        </Animated.View>
      </Pressable>

      <Text style={styles.commentsHeader}>
        {post.commentsCount} комментариев
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 16,
  },

  likeButton: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },

  count: {
    fontWeight: '600',
  },

  commentsHeader: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    fontWeight: '600',
  },
});