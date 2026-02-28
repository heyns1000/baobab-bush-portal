import fedoraImage from '@assets/generated_images/Fedora_hat_product_shot_553c136a.png';
import panamaImage from '@assets/generated_images/Panama_hat_product_shot_db172bf3.png';
import derbyImage from '@assets/generated_images/Derby_hat_product_shot_a8845425.png';
import leatherImage from '@assets/generated_images/Leather_hat_product_shot_fca07055.png';
import flatCapImage from '@assets/generated_images/Flat_cap_product_shot_00bb74e3.png';
import clocheImage from '@assets/generated_images/Cloche_hat_product_shot_78c2d31c.png';
import ingonyamaImage from '@assets/HAT_1_Fruitful_Atrisan_hat_co_1772285590373.png';
import indlovuImage from '@assets/WhatsApp_Image_2026-02-25_at_10.41.28_(1)_1772287363172.jpeg';

export const imageMap: Record<string, string> = {
  'fedora': fedoraImage,
  'panama': panamaImage,
  'derby': derbyImage,
  'leather': leatherImage,
  'flatcap': flatCapImage,
  'cloche': clocheImage,
  'ingonyama': ingonyamaImage,
  'indlovu': indlovuImage,
};

export function getProductImage(imageName: string): string {
  return imageMap[imageName] || fedoraImage;
}
