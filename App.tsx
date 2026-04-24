import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FeedScreen } from './src/screens/FeedScreen';
import { PostDetailScreen } from './src/screens/PostDetailScreen';
import { useWebSocket } from './src/shared/hooks/useWebSocket';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

const WebSocketBootstrap = () => {
  useWebSocket();
  return null;
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WebSocketBootstrap />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Feed" component={FeedScreen} />
          <Stack.Screen name="PostDetail" component={PostDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}