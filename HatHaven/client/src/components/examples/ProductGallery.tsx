import ProductGallery from '../ProductGallery';
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

export default function ProductGalleryExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductGallery 
        onProductClick={(id) => console.log('Product clicked:', id)}
      />
    </QueryClientProvider>
  );
}
