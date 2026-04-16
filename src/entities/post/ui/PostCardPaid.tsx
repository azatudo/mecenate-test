import { View, Text, Image } from 'react-native';
import { styles } from './PostCard.styles';
import { Post } from '../model/types';

type Props = {
  post: Post;
};

export const PostCardPaid = ({ post }: Props) => {
  return (
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
  );
};