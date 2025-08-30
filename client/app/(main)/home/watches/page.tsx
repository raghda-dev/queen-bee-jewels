// app/(main)/home/watches/page.tsx

import WatchesPageClient from './WatchesPageClient';
import { shopifyQuery } from '../../../../../lib/shopify/client';
import { GET_PRODUCTS_QUERY } from '../../../../../lib/shopify/products/queries';
import { ShopifyProductsResponse, ShopifyProduct } from '../../../../../lib/shopify/products/types';

export default async function WatchesPage() {
  const data: ShopifyProductsResponse = await shopifyQuery(GET_PRODUCTS_QUERY);
  const products: ShopifyProduct[] = data.products.edges.map((edge) => edge.node);

  return <WatchesPageClient products={products} />;
}
