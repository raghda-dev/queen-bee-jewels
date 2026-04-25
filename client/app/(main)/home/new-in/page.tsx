// app/(main)/home/new-in/page.tsx

import NewInPageClient from './NewInPageClient';
import { fetchAllProducts, ShopifyProduct } from '../../../../../lib/shopify';

export default async function NewInPage() {
  const products: ShopifyProduct[] = await fetchAllProducts();

  // Pass all products to client seeder — the seeder will pick the "new-in" ones.
  return <NewInPageClient products={products} />;
}
