import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  tagline: string;
  heroImage: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

import kidsImg from "@assets/FRUITFUL_KIDS_1770843357438.png";

export default function HeroSection({
  title,
  subtitle,
  tagline,
  heroImage,
  ctaText = "Explore Collection",
  onCtaClick
}: HeroSectionProps) {
  return (
    <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      </div>
      
      <div className="absolute bottom-10 right-10 z-20 hidden max-w-sm flex-col items-center rounded-lg bg-background/20 p-4 backdrop-blur-md md:flex">
        <img src={kidsImg} alt="Fruitful Kids" className="mb-2 h-24 w-auto rounded" />
        <p className="text-center text-xs font-medium text-white">Changing the seeds for our kids</p>
      </div>

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-white/90" data-testid="text-tagline">
            {tagline}
          </p>
          <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl" data-testid="text-hero-title">
            {title}
          </h1>
          <p className="mb-8 text-lg text-white/90 md:text-xl" data-testid="text-hero-subtitle">
            {subtitle}
          </p>
          <Button 
            size="lg"
            variant="outline"
            className="bg-background/10 backdrop-blur-md hover:bg-background/20"
            onClick={onCtaClick}
            data-testid="button-explore-collection"
          >
            {ctaText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
