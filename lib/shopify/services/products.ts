// app/(main)/lib/shopify/services/products.ts

import { shopifyQuery } from "./client";
import {
  GET_PRODUCTS_QUERY,
  GET_PRODUCT_BY_HANDLE_QUERY,
} from "../graphql/queries";
import {
  ShopifyProduct,
  ShopifyProductByHandle,
  ShopifyProductsResponse,
} from "../types";

export async function fetchAllProducts(): Promise<ShopifyProduct[]> {
  const data = await shopifyQuery<ShopifyProductsResponse>(GET_PRODUCTS_QUERY);
  return data.products.edges.map(edge => edge.node);
}

export async function fetchShopifyProductByHandle(handle: string): Promise<ShopifyProductByHandle | null> {
  const data = await shopifyQuery<{ productByHandle: ShopifyProductByHandle | null }>(
    GET_PRODUCT_BY_HANDLE_QUERY,
    { handle }
  );
  return data.productByHandle;
}

export async function fetchRecommendedProducts(
  productType: string,
  currentProductId: string
): Promise<ShopifyProductByHandle[]> {
  const data = await shopifyQuery<ShopifyProductsResponse>(GET_PRODUCTS_QUERY);

  const allProducts = data.products.edges.map(edge => edge.node);

  const filtered = allProducts
    .filter(product => product.productType === productType && product.id !== currentProductId)
    .slice(0, 4);

  const recommendedWithVariants = await Promise.all(
    filtered.map(async (product) => {
      const fullProduct = await fetchShopifyProductByHandle(product.handle);
      return fullProduct || null;
    })
  );

  return recommendedWithVariants.filter(p => p !== null) as ShopifyProductByHandle[];
}
