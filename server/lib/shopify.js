// server/lib/shopify.js

import { shopifyClient } from './shopifyClient.js';
import { GET_PRODUCTS_BY_ID } from '../../lib/shopify/products/queries.js';

export async function getProductById(productId) {
  const globalId = `gid://shopify/Product/${productId}`;

  const data = await shopifyClient(GET_PRODUCTS_BY_ID, { ids: [globalId] });

  if (!data.nodes || !data.nodes[0]) {
    throw new Error(`Product not found for ID: ${productId}`);
  }

  return data.nodes[0];
}
