import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import type { NewsArticle } from "@shared/schema";
import workshopImage from '@assets/generated_images/Artisan_workshop_craftsmanship_scene_1ae7ee28.png';
import panamaImage from '@assets/generated_images/Panama_hat_product_shot_db172bf3.png';
import materialImage from '@assets/generated_images/Felt_material_close-up_texture_6a81b33a.png';

const newsImageMap: Record<string, string> = {
  'workshop': workshopImage,
  'panama': panamaImage,
  'material': materialImage,
};

function getNewsImage(imageName: string): string {
  return newsImageMap[imageName] || workshopImage;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
}

import cookingHatImg from "@assets/Fruitful_kitchens1_1761399292042.png";

interface NewsSectionProps {
  onArticleClick?: (id: string) => void;
}

export default function NewsSection({ onArticleClick }: NewsSectionProps) {
  const { data: articles = [], isLoading } = useQuery<NewsArticle[]>({
    queryKey: ['/api/news'],
  });

  return (
    <section className="bg-card py-24" id="news">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-4xl font-bold text-foreground md:text-5xl" data-testid="text-news-title">
            Latest Stories
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-news-subtitle">
            Insights from our workshop, new collections, and care guides
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="aspect-[4/3] animate-pulse rounded-md bg-muted" />
            ))}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="group overflow-hidden border-2 border-primary/20 bg-primary/5 hover-elevate md:col-span-2 lg:col-span-3">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="h-full min-h-[300px] overflow-hidden">
                  <img src={cookingHatImg} alt="Cooking Hats" className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-col justify-center p-8">
                  <Badge className="mb-4 w-fit bg-primary">Featured Story</Badge>
                  <h3 className="mb-4 font-serif text-3xl font-bold">The Art of Cooking Hats</h3>
                  <p className="mb-6 text-lg text-muted-foreground">
                    Locally crafted kitchen wear designed for South African chefs. Handmade excellence meets professional durability in our latest collection of artisan cooking hats.
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <Calendar className="h-4 w-4" />
                    <span>February 11, 2026</span>
                  </div>
                </div>
              </div>
            </Card>
            {articles.slice(0, 3).map((article) => (
              <Card
                key={article.id}
                className="group cursor-pointer overflow-hidden hover-elevate"
                onClick={() => onArticleClick?.(article.id)}
                data-testid={`card-news-${article.id}`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={getNewsImage(article.image)}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    data-testid={`img-news-${article.id}`}
                  />
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs" data-testid={`badge-category-${article.id}`}>
                      {article.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span data-testid={`text-date-${article.id}`}>{formatDate(article.publishedAt)}</span>
                    </div>
                  </div>
                  <h3 className="mb-3 font-serif text-xl font-semibold text-foreground" data-testid={`text-news-title-${article.id}`}>
                    {article.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground" data-testid={`text-news-excerpt-${article.id}`}>
                    {article.excerpt}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
