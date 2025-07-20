//client/app/(main)/home/product/[handle]/page.tsx


import { notFound } from 'next/navigation';
import ProductDetailsClient from './ProductDetailsClient';
import {
  fetchShopifyProductByHandle,
  fetchRecommendedProducts,
} from "../../../../../../lib/shopify"; // ✅ updated barrel import

export default async function ProductDetails({
  params,
}: {
  params: { handle: string };
}) {
  const { handle } = params;

  const product = await fetchShopifyProductByHandle(handle);
  if (!product) return notFound();

  const recommendedProducts = await fetchRecommendedProducts(
    product.productType || '',
    product.handle
  );

  return (
    <div className="min-h-screen flex items-center justify-center">
      <ProductDetailsClient
       product={product}
       recommendedProducts={recommendedProducts}
/>

    </div>
  );
}
