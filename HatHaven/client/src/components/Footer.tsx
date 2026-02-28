import { Instagram, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";

export default function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest('POST', '/api/newsletter/subscribe', { email });
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
    },
    onError: (error: any) => {
      const message = error.message || "Failed to subscribe. Please try again.";
      toast({
        title: "Subscription failed",
        description: message,
        variant: "destructive",
      });
    },
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      subscribeMutation.mutate(email);
    }
  };

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 font-serif text-xl font-bold text-foreground" data-testid="text-footer-brand">
              Artisan Hat Co.
            </h3>
            <p className="mb-6 text-sm text-muted-foreground">
              Handcrafted excellence since 1947. Each hat tells a story of tradition and artistry.
            </p>
            <div className="flex gap-3">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => console.log('Instagram clicked')}
                data-testid="button-instagram"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => console.log('Facebook clicked')}
                data-testid="button-facebook"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => console.log('Twitter clicked')}
                data-testid="button-twitter"
              >
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-foreground">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">All Hats</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Men's Collection</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Women's Collection</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Accessories</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-foreground">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Sizing Guide</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Care Instructions</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-foreground">Newsletter</h4>
            <p className="mb-4 text-sm text-muted-foreground">
              Subscribe for exclusive offers and craftsmanship insights.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribeMutation.isPending}
                data-testid="input-newsletter-email"
              />
              <Button 
                type="submit" 
                disabled={subscribeMutation.isPending}
                data-testid="button-subscribe"
              >
                {subscribeMutation.isPending ? "..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Artisan Hat Co. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
