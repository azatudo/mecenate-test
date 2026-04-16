import { View, Text, Image } from 'react-native';
import { styles } from './PostCard.styles';
import { Post } from '../model/types';
import { PostCardHeader } from './PostCardHeader';
import { PostCardPaid } from './PostCardPaid';

export const PostCard = ({ post }: { post: Post }) => {
  const isPaid = post.tier === 'paid';

  return (
    <View style={styles.card}>

      <PostCardHeader author={post.author} />

      {/* IMAGE FIRST */}
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

      {/* CONTENT UNDER IMAGE (only for free) */}
      {!isPaid && (
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {post.title}
          </Text>

          <Text style={styles.description} numberOfLines={2}>
            {post.preview}
          </Text>

          {/* FOOTER */}
          <View style={styles.footer}>
            <View style={styles.stat}>
              <Text style={styles.icon}>❤️</Text>
              <Text style={styles.count}>{post.likesCount}</Text>
            </View>

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