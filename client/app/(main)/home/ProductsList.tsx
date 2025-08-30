// client/app/(main)/home/ProductsList.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import Card from '../components/Card';
import AddToCartButton from '../components/AddToCartButton';
import AddToWishlistButton from '../components/AddToWishlistButton';
import { ShopifyProduct } from '../../../../lib/shopify/products/types';

type ProductsListProps = {
  products?: ShopifyProduct[]; // optional
};

export default function ProductsList({ products = [] }: ProductsListProps) {
  return (
    <div className="grid grid-cols-1 gap-14 pb-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <Link key={product.id} href={`/home/product/${product.handle}`} legacyBehavior>
          <Card
            size="small"
            id={product.id}
            handle={product.handle}
            title={product.title}
            description={product.description ?? undefined}
            img={product.featuredImage?.url ?? undefined}
            price={product.priceRange.minVariantPrice.amount}
            currencyCode={product.priceRange.minVariantPrice.currencyCode}
            images={(product.images?.edges?.map((edge) => edge?.node?.url).filter(Boolean) as string[]) ?? []}
            productType={product.productType ?? undefined}
            vendor={product.vendor ?? undefined}
            tags={product.tags}
            primaryButton={<AddToCartButton product={product} />}
            secondaryButton={<AddToWishlistButton product={product} />}
          />
        </Link>
      ))}
    </div>
  );
}
