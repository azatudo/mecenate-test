import { View, Text, Image } from 'react-native';
import { styles } from './PostCard.styles';

type Post = {
  id: string;
  tier: 'free' | 'paid';
  title: string;
  preview: string;
  coverUrl?: string;
  likesCount: number;
  commentsCount: number;
  author?: {
    displayName?: string;
    avatarUrl?: string;
  };
};

export const PostCard = ({ post }: { post: Post }) => {
  const isPaid = post.tier === 'paid';

  return (
    <View style={styles.card}>

      {/* HEADER */}
      <View style={styles.header}>
        {post.author?.avatarUrl && (
          <Image
            source={{ uri: post.author.avatarUrl }}
            style={styles.avatar}
          />
        )}

        <Text style={styles.author}>
          {post.author?.displayName}
        </Text>
      </View>

      {/* IMAGE FIRST */}
      {!isPaid && post.coverUrl && (
        <Image
          source={{ uri: post.coverUrl }}
          style={styles.image}
        />
      )}

      {/* PAID BLOCK FULL WIDTH */}
      {isPaid && (
        <View style={styles.lockContainer}>

          {post.coverUrl && (
            <Image
              source={{ uri: post.coverUrl }}
              style={styles.lockImage}
              blurRadius={20}
            />
          )}

          <View style={styles.lockOverlay} />

          <View style={styles.lockContent}>
            <Text style={styles.lockIcon}>💰</Text>
            <Text style={styles.lockTitle}>
              Контент скрыт пользователем
            </Text>
            <Text style={styles.lockSubtitle}>
              Доступ откроется после доната
            </Text>

            <View style={styles.lockButton}>
              <Text style={styles.lockButtonText}>Отправить донат</Text>
            </View>
          </View>
        </View>
      )}

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