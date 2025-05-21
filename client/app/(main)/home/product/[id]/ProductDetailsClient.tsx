'use client';

import React, { useState } from 'react';
import Button from '../../../components/Button';
import Image , {StaticImageData} from 'next/image';
import RelatedProductsScroller from '../../../components/RelatedProductsScroller';
import { Product } from '../../data/products';

interface ProductDetailsClientProps {
  product: Product;
  recommendedProducts: Product[];
  viewImages: (string | StaticImageData | undefined)[];
}

export default function ProductDetailsClient({
  product,
  recommendedProducts,
  viewImages,
}: ProductDetailsClientProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(product);

  const displayedProduct = selectedProduct || product;

  return (
    <div>
      {/* Main Product Section */}
      <div className="flex min-h-screen transition-all w-fit md:w-[92%] lg:w-[95%] xl:w-full px-10 py-6 flex-col items-center justify-center bg-gray-100">
        <div className="w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-md lg:min-h-[50rem] lg:max-w-[70vw]">
          {/* Upper Section - Images */}
          <div className="grid grid-cols-1 gap-4 border-b border-grayLight p-6 sm:grid-cols-3 place-items-center">
            {viewImages.map((imageSrc, index) => (
              <div
                key={index}
                className="h-72 w-fit overflow-hidden rounded-xl lg:h-96 lg:w-[90%]"
              >
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={`Product view ${index + 1}`}
                    width={400}
                    height={400}
                    className="h-[30vh] w-fit object-cover "
                  />
                ) : (
                  <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                    No image available
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Lower Section - Details */}
          <div className="flex flex-col gap-8 p-6 lg:flex-row">
            {/* Info */}
            <div className="flex-1 space-y-6 md:space-y-8 lg:space-y-12">
              <div className="md:text-bold flex flex-wrap items-center justify-center gap-6 text-center font-josefin text-2xl font-semibold md:text-3xl lg:text-4xl">
                <span>Name: {displayedProduct.collectionName}</span>
                <span>Types: {displayedProduct.types.join(', ')}</span>
                <span>Price: {displayedProduct.price}</span>
              </div>

              <p className="text-center text-lg leading-relaxed text-navyDark xs:text-xl sm:text-2xl lg:text-3xl">
                Description: {displayedProduct.description}
              </p>

              <div className="flex justify-center gap-x-14">
                <Button
                  variant="primary"
                  color="var(--purple-light)"
                  animation="bounce"
                >
                  Add to Cart
                </Button>
                <Button
                  variant="primary"
                  color="var(--purple-light)"
                  animation="bounce"
                >
                  Add to Wishlist
                </Button>
              </div>
            </div>

            {/* Properties Box */}
            <div className="w-full max-w-md self-center rounded-xl border bg-gray-50 p-4 shadow-inner">
              <h3 className="mb-4 text-xl font-bold lg:text-2xl">Properties</h3>
              <ul className="space-y-4 text-navyDark md:text-lg lg:text-xl">
                <li>
                  <strong>Material:</strong> {displayedProduct.material || 'Unknown'}
                </li>
                <li>
                  <strong>Collection:</strong> {displayedProduct.collection || 'Unknown'}
                </li>
                <li>
                  <strong>Color:</strong> {displayedProduct.color}
                </li>
                <li>
                  <strong>Size:</strong> {displayedProduct.size || 'Standard'}
                </li>
                <li>
                  <strong>Occasion:</strong> {displayedProduct.occasion || 'Daily, Events'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="flex w-[80vw] md:w-[67vw] lg:w-[77vw] max-w-fit flex-col items-center overflow-hidden px-3 space-y-12">
        <RelatedProductsScroller
          currentProduct={product}
          recommendedProducts={recommendedProducts}
          onProductClick={(clickedProduct) => {
            console.log("Clicked product:", clickedProduct);
            setSelectedProduct(clickedProduct);
          }}
        />
      </div>
    </div>
  );
}