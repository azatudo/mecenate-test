import {
 FlatList,
 ActivityIndicator,
 KeyboardAvoidingView,
 Platform
} from 'react-native';

import { useRoute }
from '@react-navigation/native';

import { SafeAreaView }
from 'react-native-safe-area-context';

import { usePost }
from '../entities/post/model/usePost';

import { useComments }
from '../entities/post/model/useComments';

import { colors }
from '../shared/theme/colors';

import { PostDetailHeader }
from '../entities/post/ui/postdetail/PostDetailHeader';

import { PostDetailLike }
from '../entities/post/ui/postdetail/PostDetailLike';

import { CommentItem }
from '../entities/post/ui/postdetail/CommentItem';

import { CommentInput }
from '../entities/post/ui/postdetail/CommentInput';

export const PostDetailScreen = () => {
 const route:any=useRoute();
 const { postId } = route.params;

 const { data:post,isLoading } =
  usePost(postId);

 const {
  data:commentsData,
  fetchNextPage,
  isFetchingNextPage
 } = useComments(postId);

 const comments=
  commentsData?.pages.flatMap(
    p=>p.comments
  ) ?? [];

 if(isLoading){
   return (
    <SafeAreaView style={{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:colors.background
    }}>
      <ActivityIndicator />
    </SafeAreaView>
   )
 }

 if(!post) return null;

 return(
 <SafeAreaView style={{
  flex:1,
  backgroundColor:colors.background
 }}>
  <KeyboardAvoidingView
   style={{flex:1}}
   behavior={
    Platform.OS==='ios'
     ? 'padding'
     : undefined
   }
  >

   <FlatList
    data={comments}
    keyExtractor={(item)=>item.id}
    renderItem={({item})=>(
      <CommentItem item={item}/>
    )}
    onEndReached={() => {
      if (!isFetchingNextPage) {
        fetchNextPage();
      }
    }}
    onEndReachedThreshold={0.5}
    ListHeaderComponent={
      <>
       <PostDetailHeader post={post}/>
       <PostDetailLike
        post={post}
        postId={postId}
       />
      </>
    }
    ListFooterComponent={
      isFetchingNextPage
       ? <ActivityIndicator/>
       : null
    }
   />

   <CommentInput postId={postId}/>

  </KeyboardAvoidingView>
 </SafeAreaView>
)
}