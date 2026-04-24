import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../../shared/theme/colors';

export const PostDetailHeader = ({ post }: any) => {
  const navigation = useNavigation();

  return (
    <View>
      <Pressable
        onPress={() => navigation.goBack()}
        style={styles.back}
      >
        <Text style={styles.backText}>
          ← Назад
        </Text>
      </Pressable>

      <View style={styles.authorRow}>
        {post.author?.avatarUrl && (
          <Image
            source={{ uri: post.author.avatarUrl }}
            style={styles.avatar}
          />
        )}

        <Text style={styles.authorName}>
          {post.author?.displayName}
        </Text>
      </View>

      {post.coverUrl && (
        <Image
          source={{ uri: post.coverUrl }}
          style={styles.cover}
        />
      )}

      <Text style={styles.title}>
        {post.title}
      </Text>

      {post.body ? (
        <Text style={styles.body}>
          {post.body}
        </Text>
      ) : (
        <Text style={styles.locked}>
          🔒 Контент доступен после доната
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  back: {
    padding: 16,
  },

  backText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '500',
  },

  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 12,
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
  },

  body: {
    paddingHorizontal: 16,
    marginBottom: 16,
    lineHeight: 22,
  },

  locked: {
    paddingHorizontal: 16,
    marginBottom: 16,
    color: colors.muted,
  },
});