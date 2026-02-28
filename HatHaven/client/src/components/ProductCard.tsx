import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import lekkerBadge from "@assets/Fruitful_lekker_locals_1770842523346.png";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  material: string;
  category: string;
  onClick?: (id: string) => void;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  material,
  category,
  onClick
}: ProductCardProps) {
  return (
    <Card 
      className="group relative cursor-pointer overflow-hidden border-card-border hover-elevate"
      onClick={() => onClick?.(id)}
      data-testid={`card-product-${id}`}
    >
      <div className="absolute right-2 top-2 z-10 h-10 w-10">
        <img src={lekkerBadge} alt="Lekker Local" className="h-full w-full object-contain" />
      </div>
      <div className="aspect-square overflow-hidden bg-muted">
        <img 
          src={image} 
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          data-testid={`img-product-${id}`}
        />
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-serif text-lg font-semibold text-foreground" data-testid={`text-product-name-${id}`}>
            {name}
          </h3>
          <Badge variant="secondary" className="shrink-0 text-xs" data-testid={`badge-material-${id}`}>
            {material}
          </Badge>
        </div>
        <p className="mb-3 text-sm text-muted-foreground" data-testid={`text-category-${id}`}>
          {category}
        </p>
        <p className="font-semibold text-foreground" data-testid={`text-price-${id}`}>
          ${price.toLocaleString()}
        </p>
      </div>
    </Card>
  );
}
