// home/product/[id]/page.tsx
'use client';
import React, { useState } from 'react';
import { products, Product } from '../../data/products'; // Import Product type
import Button from '@/components/Button';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { notFound } from 'next/navigation';
import RelatedProductsScroller from '@/components/RelatedProductsScroller';

// Fallback image
const fallbackImage = '/staticAssets/images/fallback.jpeg'

function getSafeSrc(src: string | StaticImageData | undefined): string | StaticImageData {
  if (!src || (typeof src === 'string' && src.trim() === '')) {
    return fallbackImage;
  }
  return src;
}

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function ProductDetails({ params }: Props) {
  // Unwrap the params object using React.use()
  const { id } = React.use(params); // Unwrap the promise to access `id`

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Find the main product based on the ID in the URL
  const product = products.find((prod) => prod.id === Number(id));

  if (!product) {
    console.error('Product not found');
    return notFound();
  }

  // Determine which product to display (selected or main product)
  const displayedProduct = selectedProduct || product;

  // Dynamically calculate the images for the displayed product
  const viewImages: (string | StaticImageData)[] = [
    getSafeSrc(displayedProduct.viewImage1),
    getSafeSrc(displayedProduct.viewImage2),
    getSafeSrc(displayedProduct.viewImage3),
  ];

  // Filter recommended products
  const recommendedProducts = products.filter(
    (prod) =>
      prod.id !== product.id &&
      prod.types?.some((type) => product.types?.includes(type))
  );

  console.log('params:', params);
  console.log('product:', product);
  console.log('displayedProduct:', displayedProduct);

  return (
    <div>
      {/* Main Product Section */}
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-6 py-12">
        <div className="w-full max-w-6xl lg:max-w-[70vw] lg:min-h-[50rem] overflow-hidden rounded-2xl bg-white shadow-xl">
          {/* Upper Section */}
          <div className="grid grid-cols-1 gap-4 border-b border-grayLight p-6 sm:grid-cols-3">
            {viewImages.map((img, idx) => (
              <div
                key={idx}
                className="h-64 lg:h-96 lg:w-[90%] w-full overflow-hidden rounded-xl"
              >
                {img ? (
                  <Image
                    src={img || fallbackImage}
                    alt={`Product ${idx}`}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <p className="text-center text-gray-500">No image available</p>
                )}
              </div>
            ))}
          </div>

          {/* Lower Section */}
          <div className="flex flex-col gap-8 p-6 lg:flex-row">
            <div className="flex-1 space-y-6 md:space-y-8 lg:space-y-12">
              {/* Line 1: Name, Type, Price */}
              <div className="flex font-semibold flex-wrap items-center justify-center gap-6 text-center font-josefin text-2xl md:text-3xl lg:text-4xl md:text-bold">
                <span>Name: {displayedProduct.collectionName}</span>
                <span>Types: {displayedProduct.types.join(', ')}</span>
                <span>Price: {displayedProduct.price}</span>
              </div>

              {/* Line 2: Description */}
              <p className="text-center text-lg xs:text-xl sm:text-2xl lg:text-3xl leading-relaxed text-navyDark">
                Description: {displayedProduct.description}
              </p>

              {/* Line 3: Buttons */}
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
              <h3 className="mb-4 text-xl lg:text-2xl font-bold">Properties</h3>
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
      <div className="w-full flex flex-col items-center overflow-hidden py-8 px-4 md:px-8">
        <RelatedProductsScroller
          currentProduct={product}
          recommendedProducts={recommendedProducts} // Pass recommended products
          onProductClick={(clickedProduct) => setSelectedProduct(clickedProduct)} // Update selected product
        />
      </div>
    </div>
  );
}
