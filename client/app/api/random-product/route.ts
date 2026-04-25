//client/app/api/random-product/route.ts

import { NextResponse } from 'next/server';
import { shopifyQuery } from '../../../../lib/shopify/client';
import { GET_PRODUCTS_QUERY } from '../../../../lib/shopify/products/queries';

type RawResponse = {
  products?: {
    edges?: Array<{ node?: { handle?: string } }>;
  };
};

export async function GET() {
  try {
    // Use the same query you already have that lists products.
    const data = (await shopifyQuery(GET_PRODUCTS_QUERY)) as RawResponse | null;

    const edges = data?.products?.edges ?? [];
    const handles = edges
      .map((e) => e?.node?.handle)
      .filter((h): h is string => typeof h === 'string' && !!h.trim());

    if (handles.length === 0) {
      // Silent fallback: return 404 JSON (OnePiece will fallback to '/')
      return NextResponse.json({ error: 'no-products' }, { status: 404 });
    }

    const random = handles[Math.floor(Math.random() * handles.length)];
    return NextResponse.json({ handle: random });
  } catch (err) {
    console.error('random-product error', err);
    return NextResponse.json({ error: 'server-error' }, { status: 500 });
  }
}
