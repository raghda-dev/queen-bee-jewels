// client/app/(main)/lib/shopify/product/[handle]/route.ts

import { NextResponse } from 'next/server';
import { fetchShopifyProductByHandle } from '../../../../lib/shopify/services/products';


export async function GET(
  request: Request,
  { params }: { params: { handle: string } }
) {
  const { handle } = params;

  try {
    const product = await fetchShopifyProductByHandle(handle);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product in API route:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
