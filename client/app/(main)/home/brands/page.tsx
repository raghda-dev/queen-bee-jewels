// app/(main)/home/brands/page.tsx

import BrandsPageClient from './BrandsPageClient';
import { fetchAllProducts, ShopifyProduct } from '../../../../../lib/shopify';

export default async function BrandsPage() {
  const products: ShopifyProduct[] = await fetchAllProducts();

  return <BrandsPageClient products={products} />;
}
