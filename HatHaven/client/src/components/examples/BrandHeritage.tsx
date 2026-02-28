import BrandHeritage from '../BrandHeritage';
import workshopImage from '@assets/generated_images/Artisan_workshop_craftsmanship_scene_1ae7ee28.png';

const story = [
  "Since 1947, our family has been dedicated to the timeless art of hat making. What began in a small workshop in Florence has grown into a legacy of craftsmanship that spans three generations.",
  "Every hat we create is a testament to patience, skill, and an unwavering commitment to quality. Our master artisans spend years perfecting their craft, learning techniques passed down through centuries.",
  "We believe that a hat is more than an accessory—it's a statement of character, a piece of wearable art that tells your unique story."
];

export default function BrandHeritageExample() {
  return (
    <BrandHeritage
      title="A Legacy of Craftsmanship"
      story={story}
      workshopImage={workshopImage}
      founderName="Giovanni Rossi"
    />
  );
}
