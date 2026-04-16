import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FeedScreen } from './src/screens/FeedScreen';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FeedScreen />
    </QueryClientProvider>
  );
}