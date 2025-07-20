// client/app/api/shopify/product/[handle]/route.ts

import { NextResponse } from 'next/server';
import { fetchShopifyProductByHandle } from '../../../../../../lib/shopify';

export async function GET(
  request: Request,
  { params }: { params: { handle: string } }
) {
  const { handle } = params;

  try {
    const product = await fetchShopifyProductByHandle(handle);
    if (!product) {
      return new NextResponse(JSON.stringify({ error: 'Product not found' }), {
        status: 404,
      });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch product' }), {
      status: 500,
    });
  }
}
