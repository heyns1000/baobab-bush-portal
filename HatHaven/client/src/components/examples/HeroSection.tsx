import HeroSection from '../HeroSection';
import heroImage from '@assets/generated_images/Hero_lifestyle_hat_portrait_94df1e50.png';

export default function HeroSectionExample() {
  return (
    <HeroSection
      tagline="Handcrafted Excellence Since 1947"
      title="Timeless Elegance, Masterful Craft"
      subtitle="Each hat tells a story of tradition, artistry, and uncompromising quality"
      heroImage={heroImage}
      onCtaClick={() => console.log('Explore collection clicked')}
    />
  );
}
