// client/app/(main)/home/page.tsx

import Link from 'next/link';
import Card from '../components/Card';
// import Button from '../components/Button';
import { shopifyQuery } from '../../../../lib/shopify/client';
import { GET_PRODUCTS_QUERY } from '../../../../lib/shopify/products/queries';
import {
  ShopifyProductsResponse,
  ShopifyProduct,
} from '../../../../lib/shopify/products/types';
import ProtectedRoute from '../components/ProtectedRoute';
import AddToCartButton from '../components/AddToCartButton';
import AddToWishlistButton from '../components/AddToWishlistButton';
import HomePageClient from './HomePageClient';


export default async function HomePage() {

  const data: ShopifyProductsResponse = await shopifyQuery(GET_PRODUCTS_QUERY);
  const products: ShopifyProduct[] = data.products.edges.map(
    (edge) => edge.node
  );

  return (
    <ProtectedRoute>
      <HomePageClient>
      <div className="flex justify-evenly py-14">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
              <Link  key={product.id} href={`/home/product/${product.handle}`} legacyBehavior>
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
                    product.images?.edges?.map((img) => img?.node?.url) || []
                  }
                  productType={product.productType ?? undefined}
                  vendor={product.vendor ?? undefined}
                  tags={product.tags}
                  primaryButton={<AddToCartButton product={product} />}
                  secondaryButton={
                    <AddToWishlistButton product={product}/>
                  }
                />
              </Link>
          ))}
        </div>
      </div>
      </HomePageClient>
    </ProtectedRoute>
  );
}
