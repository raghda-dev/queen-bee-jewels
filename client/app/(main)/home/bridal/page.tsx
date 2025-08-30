// client/app/(main)/home/bridal/page.tsx

import BridalPageClient from './BridalPageClient';
import { shopifyQuery } from '../../../../../lib/shopify/client';
import { GET_PRODUCTS_QUERY } from '../../../../../lib/shopify/products/queries';
import { ShopifyProductsResponse, ShopifyProduct } from '../../../../../lib/shopify/products/types';

export default async function BridalOnlyPage() {
  const data: ShopifyProductsResponse = await shopifyQuery(GET_PRODUCTS_QUERY);
  const products: ShopifyProduct[] = data.products.edges.map((edge) => edge.node);

  // Pass full product list to client seeder; the client seeder will pick the bridal products and set the Redux page state.
  return <BridalPageClient products={products} />;
}
