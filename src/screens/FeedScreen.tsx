import {
  FlatList,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { uiStore } from '../shared/store/uiStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePosts } from '../entities/post/model/usePosts';
import { PostCard } from '../entities/post/ui/PostCard';
import { PostCardSkeleton } from '../entities/post/ui/PostCardSkeleton';
import { ErrorCard } from '../entities/post/ui/ErrorCard';
import { colors } from '../shared/theme/colors';

export const FeedScreen = observer(() => {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
  } = usePosts();

  const onRefresh = async () => {
    uiStore.setRefreshing(true);
    await refetch();
    uiStore.setRefreshing(false);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, paddingTop: 8 }}>
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
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, paddingTop: 8 }}>
        <FlatList
          contentContainerStyle={{ paddingTop: 12, alignItems: 'stretch' }}
          data={[]}
          renderItem={null}
          ListEmptyComponent={<ErrorCard onRetry={refetch} />}
        />
      </SafeAreaView>
    );
  }

  const posts = data?.pages.flatMap((p) => p.posts) ?? [];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, paddingTop: 8 }}>
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
          <RefreshControl refreshing={uiStore.refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={
          isFetchingNextPage ? <ActivityIndicator /> : null
        }
      />
    </SafeAreaView>
  );
});