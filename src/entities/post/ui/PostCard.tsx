import { View, Text, Image, StyleSheet } from 'react-native';

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

      {/* IMAGE FIRST (как в фигме) */}
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    width: '100%',
    marginHorizontal: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  author: {
    fontSize: 15,
    fontWeight: '500',
  },
  image: {
    width: '100%',
    height: 240,
  },
  content: {
    padding: 12,
  },
  disabledContent: {
    opacity: 0.4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  lock: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    height: 36,
    borderRadius: 9999,
    backgroundColor: '#EFEFF4',
  },
  icon: {
    fontSize: 14,
  },
  count: {
    fontSize: 13,
    fontWeight: '500',
  },
  lockContainer: {
    position: 'relative',
    marginBottom: 8,
    width: '100%',
    height: 300,
    borderRadius: 0,
    overflow: 'hidden',
    backgroundColor: '#999',
  },

  lockImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  hiddenContent: {
    position: 'absolute',
    bottom: 16,
    left: 12,
    right: 12,
  },

  hiddenTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },

  hiddenDescription: {
    fontSize: 14,
    color: '#ddd',
  },

  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  lockContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
  },

  lockIcon: {
    fontSize: 24,
  },

  lockTitle: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
  },

  lockSubtitle: {
    fontSize: 12,
    color: '#ddd',
    textAlign: 'center',
  },

  lockButton: {
    marginTop: 12,
    backgroundColor: '#6C2BD9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },

  lockButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },

  skeletonTitle: {
    height: 16,
    width: '60%',
    backgroundColor: '#E5E5EA',
    borderRadius: 8,
    marginBottom: 8,
  },

  skeletonLine: {
    height: 14,
    width: '100%',
    backgroundColor: '#E5E5EA',
    borderRadius: 8,
    marginBottom: 6,
  },

  skeletonLineShort: {
    height: 14,
    width: '70%',
    backgroundColor: '#E5E5EA',
    borderRadius: 8,
  },
});