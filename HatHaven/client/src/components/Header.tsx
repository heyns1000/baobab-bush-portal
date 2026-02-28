import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu } from "lucide-react";

interface HeaderProps {
  onCartClick?: () => void;
  onMenuClick?: () => void;
}

import logoImg from "@assets/Fruitful_logo_1770843018098.png";

export default function Header({ onCartClick, onMenuClick }: HeaderProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2"
          data-testid="button-logo"
        >
          <img src={logoImg} alt="Fruitful" className="h-8 w-auto" />
          <span className="font-serif text-2xl font-bold text-foreground">Artisan Hat Co.</span>
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          <button 
            onClick={() => scrollToSection('gallery')}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            data-testid="link-collection"
          >
            Collection
          </button>
          <button 
            onClick={() => scrollToSection('heritage')}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            data-testid="link-heritage"
          >
            Our Story
          </button>
          <button 
            onClick={() => scrollToSection('craftsmanship')}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            data-testid="link-craftsmanship"
          >
            Craftsmanship
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onCartClick}
            data-testid="button-cart"
          >
            <ShoppingBag className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={onMenuClick}
            data-testid="button-menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
