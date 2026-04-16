
import { View, Text, Image } from 'react-native';

type Post = {
  id: string;
  tier: 'free' | 'paid';
  preview: string;
  coverUrl?: string;
  likesCount: number;
  commentsCount: number;
  author?: {
    displayName?: string;
  };
};

export const PostCard = ({ post }: { post: Post }) => {
  const isPaid = post.tier === 'paid';

  return (
    <View style={{ padding: 12, borderBottomWidth: 1, borderColor: '#eee' }}>
      
      {/* Автор */}
      <Text style={{ fontWeight: 'bold' }}>
        {post.author?.displayName}
      </Text>

      {/* Картинка */}
      {post.coverUrl && (
        <Image
          source={{ uri: post.coverUrl }}
          style={{ height: 200, marginVertical: 8 }}
        />
      )}

      {/* Контент */}
      {isPaid ? (
        <Text>🔒 Подпишитесь, чтобы увидеть</Text>
      ) : (
        <Text numberOfLines={3}>{post.preview}</Text>
      )}

      {/* Лайки / комменты */}
      <Text style={{ marginTop: 6 }}>
        ❤️ {post.likesCount} 💬 {post.commentsCount}
      </Text>

    </View>
  );
};