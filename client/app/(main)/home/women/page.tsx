// client/app/(main)/home/women/page.tsx

// app/(main)/home/women/page.tsx

import WomenPageClient from './WomenPageClient';
import { shopifyQuery } from '../../../../../lib/shopify/client';
import { GET_PRODUCTS_QUERY } from '../../../../../lib/shopify/products/queries';
import {
  ShopifyProductsResponse,
  ShopifyProduct,
} from '../../../../../lib/shopify/products/types';

export default async function WomenOnlyPage() {
  const data: ShopifyProductsResponse = await shopifyQuery(GET_PRODUCTS_QUERY);
  const products: ShopifyProduct[] = data.products.edges.map((edge) => edge.node);

  return <WomenPageClient products={products} />;
}
