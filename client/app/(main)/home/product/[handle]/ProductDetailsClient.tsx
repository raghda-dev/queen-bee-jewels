'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Button from '../../../components/Button';
import RelatedProductsScroller from './RelatedProductsScroller';
import { ShopifyProductByHandle } from '../../../types/shopifyTypes';

interface ProductDetailsClientProps {
  product: ShopifyProductByHandle;
  recommendedProducts: ShopifyProductByHandle[];
}

export default function ProductDetailsClient({
  product,
  recommendedProducts,
}: ProductDetailsClientProps) {
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProductByHandle>(product);

  const images =
    selectedProduct.images?.edges?.map((img) => img.node.url) ||
    (selectedProduct.featuredImage?.url ? [selectedProduct.featuredImage.url] : []);

  const selectedOptions = selectedProduct.variants?.edges[0]?.node?.selectedOptions || [];

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-5 transition-all
      w-[26rem] xs:min-w-[30rem] sm:min-w-[50rem] md:min-w-[55rem] lg:min-w-[85rem]">
      <div className="transition w-full overflow-hidden rounded-2xl 
                     bg-white shadow-md border-t lg:min-h-[50rem] lg:max-w-[60vw]">
        {/* Images Section */}
        <div className="grid grid-cols-1 gap-4 border-b border-grayLight p-6 sm:grid-cols-3">
          {images.map((imageSrc, index) => (
            <div
              key={index}
              className="h-64 w-full overflow-hidden rounded-xl lg:h-96 lg:w-[90%]"
            >
              <Image
                src={imageSrc}
                alt={`Product view ${index + 1}`}
                width={500}
                height={500}
                className="h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-8 p-6 lg:flex-row">
          <div className="flex-1 space-y-6 md:space-y-8 lg:space-y-12">
            <div className="flex flex-wrap items-center justify-center gap-12 text-center font-josefin text-xl font-extrabold lg:text-3xl">
              <span>{selectedProduct.vendor}</span>
              <span>{selectedProduct.productType}</span>
              <span className='text-xl sm:text-2xl md:text-3xl font-bold font-josefin text-purpleDark'>
                ${selectedProduct.priceRange.minVariantPrice.amount}{' '}
                {selectedProduct.priceRange.minVariantPrice.currencyCode}
              </span>
            </div>

            <p className="text-center text-lg sm:text-xl lg:text-2xl leading-relaxed text-navyDark">
              {selectedProduct.description}
            </p>

            <div className="flex justify-center gap-x-14">
              <Button variant="primary" size="medium" color="var(--purple-light)" animation="bounce">
                Add to Cart
              </Button>
              <Button variant="primary" size="medium" color="var(--purple-light)" animation="bounce">
                Add to Wishlist
              </Button>
            </div>
          </div>

          {/* Product Options / Tags */}
          <div className="w-full max-w-md self-center rounded-xl border bg-gray-50 p-4 shadow-inner">
            <h3 className="mb-4 text-xl font-bold lg:text-2xl">Product Details</h3>
            <ul className="space-y-4 text-orangeMain md:text-lg lg:text-xl">
              {selectedOptions.map((opt, idx) => (
                <li key={idx}>
                  <strong>{opt.name}:</strong> {opt.value}
                </li>
              ))}
              {selectedProduct.tags.length > 0 && (
                <li>
                  <strong>Tags:</strong> {selectedProduct.tags.join(', ')}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="w-full flex flex-col items-center px-4 py-8 md:px-8">
        <RelatedProductsScroller
          currentProduct={product}
          recommendedProducts={recommendedProducts}
          onProductClick={(clickedProduct) => {
            setSelectedProduct(clickedProduct);
          }}
        />
      </div>
    </div>
  );
}
