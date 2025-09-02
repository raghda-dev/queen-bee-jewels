//client/app/(main)/home/product/[handle]/ProductDetailsClient.tsx

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import AddToCartButton from '../../../components/AddToCartButton';
import AddToWishlistButton from '../../../components/AddToWishlistButton';
import RelatedProductsScroller from './RelatedProductsScroller';
import { ShopifyProduct } from '../../../../../../lib/shopify/products/types';
import { useRouter } from 'next/navigation';

interface ProductDetailsClientProps {
  product: ShopifyProduct;
  recommendedProducts: ShopifyProduct[];
}

export default function ProductDetailsClient({
  product,
  recommendedProducts,
}: ProductDetailsClientProps) {
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct>(product);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleProductClick = async (clickedProduct: ShopifyProduct) => {
    setLoading(true);
    try {
      const res = await fetch(`${window.location.origin}/api/shopify/product/${clickedProduct.handle}`);
      if (!res.ok) throw new Error('Failed to fetch product');
      const fullProduct = await res.json();

      if (fullProduct) {
        setSelectedProduct(fullProduct);
        router.push(`/home/product/${clickedProduct.handle}`, { scroll: false });
      } else {
        console.warn('No product found with handle:', clickedProduct.handle);
      }
    } catch (error) {
      console.error('Error fetching product by handle:', error);
    } finally {
      setLoading(false);
    }
  };

  const images =
    selectedProduct.images?.edges?.map((img) => img.node.url) ||
    (selectedProduct.featuredImage?.url ? [selectedProduct.featuredImage.url] : []);

  return (
    <div className="relative right-3 sm:right-14 lg:right-20 w-full flex flex-col items-center justify-center">
      <div className="w-full bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Top: Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6 border-b border-gray-300">
          {images.length > 0 ? (
            images.map((imageSrc, index) => (
              <div
                key={index}
                className={`w-full h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden rounded-xl
                  ${index === 2 ? 'col-span-1 sm:col-span-2 lg:col-span-1' : ''}`}
              >
                <Image
                  src={imageSrc}
                  alt={`Product view ${index + 1}`}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            ))
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-xl col-span-full">
              No image available
            </div>
          )}
        </div>

        {/* Bottom: Details */}
        <div className="flex flex-col lg:flex-row gap-8 p-6">
          {/* Text & Buttons */}
          <div className="flex-1 space-y-6">
            <div className="flex flex-wrap justify-center items-center gap-6 text-center text-xl sm:text-2xl lg:text-3xl font-josefin font-bold">
              <span>{selectedProduct.vendor}</span>
              <span>{selectedProduct.productType}</span>
              <span className="text-purpleDark">
                ${selectedProduct.priceRange.minVariantPrice.amount}{' '}
                {selectedProduct.priceRange.minVariantPrice.currencyCode}
              </span>
            </div>

            <p className="text-center text-base sm:text-lg md:text-xl leading-relaxed text-navyDark">
              {selectedProduct.description}
            </p>

            {/* Buttons */}
            <div className="flex justify-center gap-6">
              <AddToCartButton product={selectedProduct} />
              <AddToWishlistButton product={selectedProduct} />
            </div>
          </div>

          {/* Tags Box */}
          <div className="w-full max-w-md self-center rounded-xl border bg-gray-50 p-4 shadow-inner">
            <h3 className="mb-4 text-xl font-bold lg:text-2xl">Product Details</h3>
            <ul className="space-y-4 text-orangeMain text-sm sm:text-base md:text-lg lg:text-xl">
              {selectedProduct.tags?.length > 0 && (
                <li>
                  <strong>Tags:</strong> {selectedProduct.tags.join(', ')}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="w-full max-w-7xl px-4 md:px-8 py-10">
        {loading && (
          <p className="mb-4 text-center text-purpleDark text-lg font-semibold">
            Loading product...
          </p>
        )}
        <RelatedProductsScroller
          currentProduct={product}
          recommendedProducts={recommendedProducts}
          onProductClick={handleProductClick}
        />
      </div>
    </div>
  );
}


