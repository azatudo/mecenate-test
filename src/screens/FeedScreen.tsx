import {
  FlatList,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePosts } from '../entities/post/model/usePosts';
import { PostCard } from '../entities/post/ui/PostCard';
import { PostCardSkeleton } from '../entities/post/ui/PostCardSkeleton';
import { ErrorCard } from '../entities/post/ui/ErrorCard';

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
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5', paddingTop: 8 }}>
        <FlatList
          contentContainerStyle={{ paddingTop: 12 }}
          data={[]}
          renderItem={null}
          ListEmptyComponent={<View style={{ width: '100%' }}><ErrorCard onRetry={refetch} /></View>}
        />
      </SafeAreaView>
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