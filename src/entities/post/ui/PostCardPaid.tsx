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

    {/* НОРМАЛЬНЫЙ ЛЕЙАУТ */}
    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 16 }}>
      
      {/* ЦЕНТР */}
      <View style={{ alignItems: 'center', gap: 8 }}>
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

      {/* SKELETON СРАЗУ ПОД ТЕКСТОМ */}
      <View style={{ marginTop: 24, opacity: 0.25 }}>
        <View style={styles.skeletonTitle} />
        <View style={styles.skeletonLine} />
        <View style={styles.skeletonLineShort} />
      </View>

    </View>
  </View>
);
};