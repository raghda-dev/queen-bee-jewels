// client/app/collections/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { shopifyQuery } from '../../../../lib/shopify/client';
import { GET_COLLECTION_BY_HANDLE_QUERY } from '../../../../lib/shopify/collections/queries';
import type { ShopifyCollectionResponse } from '../../../../lib/shopify/collections/types';
import Card from 'app/(main)/components/Card';
import AddToCartButton from 'app/(main)/components/AddToCartButton';
import AddToWishlistButton from 'app/(main)/components/AddToWishlistButton';
import Image from 'next/image';

type PageProps = {
  params: { slug: string };
};

export default async function CollectionPage({ params }: PageProps) {
  const data: ShopifyCollectionResponse = await shopifyQuery(
    GET_COLLECTION_BY_HANDLE_QUERY,
    { handle: params.slug }
  );

  const collection = data.collection;

  if (!collection) return notFound();

  return (
    <div className="min-h-screen px-6 py-20">
      <h1 className="mb-6 text-center font-josefin text-5xl font-bold text-purpleDark">
        {collection.title}
      </h1>
      <p className="mb-10 text-center text-lg text-gray-700">
        {collection.description}
      </p>

      {collection.image && (
        <div className="mx-auto mb-16 max-w-xl overflow-hidden rounded-xl shadow-md">
          <Image
            src={collection.image.url}
            alt={collection.title}
            className="h-auto w-full object-cover"
          />
        </div>
      )}

      <div className="flex justify-evenly py-14">
        <div className="grid grid-cols-1 gap-24 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {collection.products.edges.map((edge) => {
            const product = edge.node;
            return (
              <Card
                size="sm_md"
                key={product.id}
                id={product.id}
                handle={product.handle}
                title={product.title}
                img={product.featuredImage?.url ?? undefined}
                images={
                  product.images?.edges?.map((img) => img?.node?.url) || []
                }
                productType={product.productType ?? undefined}
                vendor={product.vendor ?? undefined}
                tags={product.tags}
                primaryButton={<AddToCartButton product={product} />}
                secondaryButton={<AddToWishlistButton product={product} />}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
