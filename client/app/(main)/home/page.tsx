// client/app/(main)/home/page.tsx

import Link from 'next/link';
import Card from '../components/Card';
import Button from '../components/Button';
import { shopifyQuery } from '../lib/shopify/client';
import { GET_PRODUCTS_QUERY } from '../lib/shopify/products/queries';
import {
  ShopifyProductsResponse,
  ShopifyProduct,
} from '../lib/shopify/products/types';
import ProtectedRoute from '../components/ProtectedRoute';

export default async function HomePage() {
  const data: ShopifyProductsResponse = await shopifyQuery(GET_PRODUCTS_QUERY);
  const products: ShopifyProduct[] = data.products.edges.map(
    (edge) => edge.node
  );

  return (
    <ProtectedRoute>
    <div className="flex justify-evenly py-14">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/home/product/${product.handle}`}
            legacyBehavior
          >
            <a>
              <Card
                size="small"
                id={product.id}
                handle={product.handle}
                title={product.title}
                description={product.description ?? undefined}
                img={product.featuredImage?.url ?? undefined}
                price={product.priceRange.minVariantPrice.amount}
                currencyCode={product.priceRange.minVariantPrice.currencyCode}
                images={
                  product.images?.edges?.map((img) => img.node.url) || []
                }
                productType={product.productType ?? undefined}
                vendor={product.vendor ?? undefined}
                tags={product.tags}
                primaryButton={
                  <Button
                    size="small"
                    variant="primary"
                    color="var(--purple-light)"
                    animation="bounce"
                  >
                    Add to Cart
                  </Button>
                }
                secondaryButton={
                  <Button
                    size="small"
                    variant="primary"
                    color="var(--purple-light)"
                    animation="bounce"
                  >
                    Add to Wishlist
                  </Button>
                }
              />
            </a>
          </Link>
        ))}
      </div>
    </div>
    </ProtectedRoute>
  );
}
