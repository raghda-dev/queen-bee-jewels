// app/(main)/home/silver/page.tsx

import SilverPageClient from './SilverPageClient';
import { shopifyQuery } from '../../../../../lib/shopify/client';
import { GET_PRODUCTS_QUERY } from '../../../../../lib/shopify/products/queries';
import { ShopifyProductsResponse, ShopifyProduct } from '../../../../../lib/shopify/products/types';

export default async function SilverOnlyPage() {
  const data: ShopifyProductsResponse = await shopifyQuery(GET_PRODUCTS_QUERY);
  const products: ShopifyProduct[] = data.products.edges.map((edge) => edge.node);

  return <SilverPageClient products={products} />;
}

