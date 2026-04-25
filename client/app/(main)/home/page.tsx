// client/app/(main)/home/page.tsx

import ProtectedRoute from '../components/ProtectedRoute';
import HomePageClient from './HomePageClient';
import { shopifyQuery } from '../../../../lib/shopify/client';
import { GET_PRODUCTS_QUERY } from '../../../../lib/shopify/products/queries';
import { ShopifyProductsResponse, ShopifyProduct } from '../../../../lib/shopify/products/types';


export default async function HomePage() {
  const data: ShopifyProductsResponse = await shopifyQuery(GET_PRODUCTS_QUERY);
  const products: ShopifyProduct[] = data.products.edges.map((edge) => edge.node);

  return (
    <ProtectedRoute>
      <HomePageClient products={products} />
    </ProtectedRoute>
  );
}


