// client/app/(main)/home/classic/page.tsx

import ClassicPageClient from './ClassicPageClient';
import { fetchAllProducts, ShopifyProduct } from '../../../../../lib/shopify';

export default async function ClassicPage() {
  // fetch all products on the server
  const products: ShopifyProduct[] = await fetchAllProducts();

  // pass them to the client seeder which will pick the classic ones and seed Redux
  return <ClassicPageClient products={products} />;
}
