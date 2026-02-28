import CraftsmanshipSection from '../CraftsmanshipSection';
import materialImage from '@assets/generated_images/Felt_material_close-up_texture_6a81b33a.png';

const features = [
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

export default function CraftsmanshipSectionExample() {
  return (
    <CraftsmanshipSection
      features={features}
      materialImage={materialImage}
    />
  );
}
