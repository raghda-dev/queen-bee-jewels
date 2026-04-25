// app/(main)/home/gifts/page.tsx

import GiftsPageClient from './GiftsPageClient';
import { fetchAllProducts, ShopifyProduct } from '../../../../../lib/shopify';

export default async function GiftBoxesPage() {
  const products: ShopifyProduct[] = await fetchAllProducts();

  // pass all products to client seeder which will pick gifts
  return <GiftsPageClient products={products} />;
}
