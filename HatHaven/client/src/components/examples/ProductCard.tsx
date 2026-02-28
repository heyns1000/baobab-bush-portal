import ProductCard from '../ProductCard';
import fedoraImage from '@assets/generated_images/Fedora_hat_product_shot_553c136a.png';

export default function ProductCardExample() {
  return (
    <div className="max-w-xs">
      <ProductCard
        id="fedora-1"
        name="Classic Fedora"
        price={295}
        image={fedoraImage}
        material="Felt"
        category="Wide Brim"
        onClick={(id) => console.log('Product clicked:', id)}
      />
    </div>
  );
}
