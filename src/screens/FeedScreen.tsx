import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { usePosts } from '../entities/post/model/usePosts';
import { PostCard } from '../entities/post/ui/PostCard';

export const FeedScreen = () => {
  const { data, isLoading, isError, refetch } = usePosts();

  if (isLoading) return <ActivityIndicator />;

  if (isError) {
    return (
      <View>
        <Text>Ошибка загрузки</Text>
        <Text onPress={() => refetch()}>Повторить</Text>
      </View>
    );
  }

  const posts = data?.pages.flatMap((p) => p.posts) ?? [];

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => <PostCard post={item} />}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={() => refetch()} />
      }
    />
  );
};