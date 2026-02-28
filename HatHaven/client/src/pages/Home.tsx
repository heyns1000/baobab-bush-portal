import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductGallery from "@/components/ProductGallery";
import BrandHeritage from "@/components/BrandHeritage";
import CraftsmanshipSection from "@/components/CraftsmanshipSection";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";

import heroImage from '@assets/generated_images/Hero_lifestyle_hat_portrait_94df1e50.png';
import workshopImage from '@assets/generated_images/Artisan_workshop_craftsmanship_scene_1ae7ee28.png';
import materialImage from '@assets/generated_images/Felt_material_close-up_texture_6a81b33a.png';

const brandStory = [
  "Our hats are proudly handmade by South African local artisans like Margaret Mashaphu and master potters from rural South Africa. We believe in changing the fruits one seed at a time by supporting lekker locals.",
  "Since 1947, our family has been dedicated to the timeless art of hat making. What began in a small workshop has grown into a legacy of craftsmanship that supports local communities.",
  "Every hat we create is a testament to patience, skill, and an unwavering commitment to quality. Our artisans spend years perfecting their craft, learning techniques passed down through centuries.",
  "If you don't like the fruits you are growing, change the seeds... We are committed to changing the landscape of local craftsmanship."
];

const craftsmanshipFeatures = [
  {
    icon: 'sourcing' as const,
    title: 'Premium Sourcing',
    description: 'We source the finest materials from around the world—Portuguese felt, Ecuadorian straw, Italian leather. Each material is selected for its superior quality and sustainability.'
  },
  {
    icon: 'crafting' as const,
    title: 'Artisan Crafting',
    description: 'Our master craftsmen use time-honored techniques, shaping each hat by hand with tools that have been in our workshop for generations. Every stitch, every curve is deliberate.'
  },
  {
    icon: 'quality' as const,
    title: 'Quality Assurance',
    description: 'Before leaving our workshop, each hat undergoes rigorous inspection. We stand behind our craftsmanship with a lifetime guarantee on all structural elements.'
  }
];

export default function Home() {
  const handleProductClick = (id: string) => {
    console.log('Product clicked:', id);
  };

  const handleArticleClick = (id: string) => {
    console.log('Article clicked:', id);
  };

  const handleExploreClick = () => {
    const gallery = document.getElementById('gallery');
    gallery?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Header 
        onCartClick={() => console.log('Cart clicked')}
        onMenuClick={() => console.log('Menu clicked')}
      />
      
      <main>
        <HeroSection
          tagline="Handcrafted Excellence Since 1947"
          title="Timeless Elegance, Masterful Craft"
          subtitle="Each hat tells a story of tradition, artistry, and uncompromising quality"
          heroImage={heroImage}
          onCtaClick={handleExploreClick}
        />

        <ProductGallery 
          onProductClick={handleProductClick}
        />

        <BrandHeritage
          title="A Legacy of Craftsmanship"
          story={brandStory}
          workshopImage={workshopImage}
          founderName="Giovanni Rossi"
        />

        <CraftsmanshipSection
          features={craftsmanshipFeatures}
          materialImage={materialImage}
        />

        <NewsSection 
          onArticleClick={handleArticleClick}
        />
      </main>

      <Footer />
    </div>
  );
}
