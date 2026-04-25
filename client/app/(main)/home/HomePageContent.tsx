//client/app/(main)/home/HomePageContent.tsx

'use client';

import { useSelector } from 'react-redux';
import { RootState } from '../lib/redux/store';
import Link from 'next/link';
import Card from '../components/Card';
import AddToCartButton from '../components/AddToCartButton';
import AddToWishlistButton from '../components/AddToWishlistButton';
import { ShopifyProduct } from '../../../../lib/shopify/products/types';

type Props = {
  page?: string;
};

export default function HomePageContent({ page = 'home' }: Props) {
  const filteredProducts: ShopifyProduct[] = useSelector(
    (state: RootState) => state.sidebar.pages[page]?.filteredProducts ?? []
  );

  if (!filteredProducts.length) return <p className="mt-20 text-center">No products found.</p>;

  return (
    <div className="flex justify-evenly py-14">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product: ShopifyProduct) => (
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
    </div>
  );
}
