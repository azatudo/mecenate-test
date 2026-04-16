import { View, Text, Image } from 'react-native';
import { styles } from './PostCard.styles';
import { Post } from '../model/types';

type Props = {
  author?: Post['author'];
};

export const PostCardHeader = ({ author }: Props) => {
  return (
    <View style={styles.header}>
      {author?.avatarUrl && (
        <Image
          source={{ uri: author.avatarUrl }}
          style={styles.avatar}
        />
      )}

      <Text style={styles.author}>
        {author?.displayName}
      </Text>
    </View>
  );
};