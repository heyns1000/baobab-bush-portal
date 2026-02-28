import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { getProductImage } from "@/lib/imageMap";
import type { Product } from "@shared/schema";

interface ProductGalleryProps {
  onProductClick?: (id: string) => void;
}

const filters = ["All", "Felt", "Straw", "Leather", "Wool", "Traditional Artisan"];

export default function ProductGallery({ onProductClick }: ProductGalleryProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const filteredProducts = activeFilter === "All" 
    ? products 
    : products.filter(p => p.material === activeFilter || p.category === activeFilter);

  return (
    <section className="bg-background py-24" id="gallery">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-4xl font-bold text-foreground md:text-5xl" data-testid="text-gallery-title">
            Our Collection
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-gallery-subtitle">
            Discover premium handcrafted hats for every occasion
          </p>
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter)}
              data-testid={`button-filter-${filter.toLowerCase()}`}
            >
              {filter}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square animate-pulse rounded-md bg-muted" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={parseFloat(product.price)}
                image={getProductImage(product.image)}
                material={product.material}
                category={product.category}
                onClick={onProductClick}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
