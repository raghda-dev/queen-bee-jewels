'use client';

import React from 'react';
import CompactCard from '../../../components/CompactCard';
import { ShopifyProductByHandle } from '../../../types/shopifyTypes';
import { useRouter } from 'next/navigation';

interface RelatedProductsScrollerProps {
  currentProduct: ShopifyProductByHandle;
  recommendedProducts: ShopifyProductByHandle[];
  onProductClick?: (clickedProduct: ShopifyProductByHandle) => void; // ✅ added
}

const RelatedProductsScroller: React.FC<RelatedProductsScrollerProps> = ({
  currentProduct,
  recommendedProducts,
  onProductClick,
}) => {
  const router = useRouter();

  if (!currentProduct) return <p className="text-gray-500">No current product available.</p>;

  return (
    <div className="w-[90%] h-fit flex flex-col items-start overflow-hidden px-4 py-7 md:px-8">
      <h2 className="mb-6 text-center font-josefin text-2xl font-bold text-black sm:text-3xl lg:text-4xl">
        Related Products
      </h2>

      <div className="relative w-full overflow-x-auto scrollbar-hide custom-scrollbar py-8">
        <div className="flex px-2 sm:px-4">
          {recommendedProducts.length > 0 ? (
            recommendedProducts.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[20vw] min-w-[20rem] sm:w-[30vw] md:w-[20vw] lg:w-[15vw] aspect-[3/4] mb-5 mr-5"
              >
                <CompactCard
                  img={product.featuredImage?.url || '/staticAssets/images/fallback.jpeg'}
                  collectionName={product.handle || 'Unknown'}
                  price={product.priceRange.minVariantPrice.amount}
                  onClick={() =>
                    onProductClick ? onProductClick(product) : router.push(`/home/product/${product.handle}`)
                  }
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500">No related products available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RelatedProductsScroller;
