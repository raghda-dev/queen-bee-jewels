// client/app/(main)/home/men/page.tsx

import MenPageClient from './MenPageClient';
import { fetchAllProducts, ShopifyProduct } from '../../../../../lib/shopify';

export default async function MenOnlyPage() {
  const products: ShopifyProduct[] = await fetchAllProducts();

  // Pass all products to client seeder — seeder will pick the men ones
  return <MenPageClient products={products} />;
}
