import NewsSection from '../NewsSection';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const res = await fetch(queryKey[0] as string);
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      },
    },
  },
});

export default function NewsSectionExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <NewsSection 
        onArticleClick={(id) => console.log('Article clicked:', id)}
      />
    </QueryClientProvider>
  );
}
