import {
  FlatList,
  View,
  ActivityIndicator,
  RefreshControl,
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { uiStore, FeedFilter } from '../shared/store/uiStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePosts } from '../entities/post/model/usePosts';
import { PostCard } from '../entities/post/ui/PostCard';
import { PostCardSkeleton } from '../entities/post/ui/PostCardSkeleton';
import { ErrorCard } from '../entities/post/ui/ErrorCard';
import { colors } from '../shared/theme/colors';
import { useNavigation } from '@react-navigation/native';
import { FeedScreenNavigationProp } from '../navigation/types';

const TABS: { label: string; value: FeedFilter }[] = [
  { label: 'Все', value: 'all' },
  { label: 'Бесплатные', value: 'free' },
  { label: 'Платные', value: 'paid' },
];

export const FeedScreen = observer(() => {
  const navigation = useNavigation<FeedScreenNavigationProp>();

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
  } = usePosts(uiStore.feedFilter);

  const onRefresh = async () => {
    uiStore.setRefreshing(true);
    await refetch();
    uiStore.setRefreshing(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, paddingTop: 8 }}>

      {/* ТАБЫ */}
      <View style={styles.tabs}>
        {TABS.map((tab) => {
          const isActive = uiStore.feedFilter === tab.value;
          return (
            <Pressable
              key={tab.value}
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => uiStore.setFeedFilter(tab.value)}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {isLoading && (
        <View style={{ paddingTop: 12 }}>
          <View style={{ marginBottom: 20 }}><PostCardSkeleton /></View>
          <View style={{ marginBottom: 20 }}><PostCardSkeleton /></View>
          <View style={{ marginBottom: 20 }}><PostCardSkeleton /></View>
        </View>
      )}

      {isError && <ErrorCard onRetry={refetch} />}

      {!isLoading && !isError && (
        <FlatList
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingTop: 12, paddingBottom: 8 }}
          data={data?.pages.flatMap((p) => p.posts) ?? []}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Pressable
              style={{ marginBottom: 20 }}
              onPress={() => navigation.navigate('PostDetail', { postId: item.id })}
            >
              <PostCard post={item} />
            </Pressable>
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
      )}

    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
    backgroundColor: colors.surface,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.border,
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.muted,
  },
  tabTextActive: {
    color: colors.background,
  },
});