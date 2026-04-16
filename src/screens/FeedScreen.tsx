import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePosts } from '../entities/post/model/usePosts';
import { PostCard } from '../entities/post/ui/PostCard';
import { PostCardSkeleton } from '../entities/post/ui/PostCardSkeleton';

export const FeedScreen = () => {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
  } = usePosts();

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5', paddingTop: 8 }}>
        <View style={{ paddingTop: 12 }}>
          <View style={{ marginBottom: 20 }}>
            <PostCardSkeleton />
          </View>
          <View style={{ marginBottom: 20 }}>
            <PostCardSkeleton />
          </View>
          <View style={{ marginBottom: 20 }}>
            <PostCardSkeleton />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5', padding: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 16 }}>
          Не удалось загрузить публикации
        </Text>

        <Pressable
          onPress={() => refetch()}
          style={{
            backgroundColor: '#6C2BD9',
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: '#fff', fontWeight: '600' }}>
            Повторить
          </Text>
        </Pressable>
      </View>
    );
  }

  const posts = data?.pages.flatMap((p) => p.posts) ?? [];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5', paddingTop: 8 }}>
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 12, paddingBottom: 8 }}
        data={posts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <PostCard post={item} />
          </View>
        )}
        onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => refetch()} />
        }
        ListFooterComponent={
          isFetchingNextPage ? <ActivityIndicator /> : null
        }
      />
    </SafeAreaView>
  );
};