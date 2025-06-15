// client/app/(main)/lib/shopify/products/fetchAllProducts.ts

import { shopifyQuery } from "../client";
import { GET_PRODUCTS_QUERY } from "./queries";
import { ShopifyProductsResponse, ShopifyProduct } from "./types";

export async function fetchAllProducts(): Promise<ShopifyProduct[]> {
  const data: ShopifyProductsResponse = await shopifyQuery(GET_PRODUCTS_QUERY);
  return data.products.edges.map((edge) => edge.node);
}
