// app/(main)/home/sale/page.tsx

import SalePageClient from './SalePageClient';
import { fetchAllProducts, ShopifyProduct } from '../../../../../lib/shopify';

export default async function SalePage() {
  const products: ShopifyProduct[] = await fetchAllProducts();

  // pass all products to the client seeder — client will filter to "sale"
  return <SalePageClient products={products} />;
}
