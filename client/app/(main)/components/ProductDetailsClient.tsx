"use client";

import React, { useState } from "react";
import Button from "../components/Button";
import Image from "next/image";
import RelatedProductsScroller from "../components/RelatedProductsScroller";
import { Product } from "../home/data/products";

interface ProductDetailsClientProps {
  product: Product;
  recommendedProducts: Product[];
  viewImages: string[];
}

export default function ProductDetailsClient({
  product,
  recommendedProducts,
  viewImages,
}: ProductDetailsClientProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const displayedProduct = selectedProduct || product;

  return (
    <div className="flex flex-col items-center justify-center py-12 w-full mx-auto px-4">
      <div className="w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-md lg:min-h-[50rem] lg:max-w-[70vw]">
        {/* Images Section */}
        <div className="grid grid-cols-1 gap-4 border-b border-grayLight p-6 sm:grid-cols-3">
          {viewImages.map((imageSrc, index) => (
            <div
              key={index}
              className="h-64 w-full overflow-hidden rounded-xl lg:h-96 lg:w-[90%]"
            >
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={`Product view ${index + 1}`}
                  width={500}
                  height={500}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                  No image available
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-8 p-6 lg:flex-row">
          <div className="flex-1 space-y-6 md:space-y-8 lg:space-y-12">
            <div className="flex flex-wrap items-center justify-center gap-12 text-center font-josefin text-xl font-extrabold lg:text-3xl">
              <span>{displayedProduct.collectionName}</span>
              <span>{displayedProduct.types.join(", ")}</span>
              <span>${displayedProduct.price}</span>
            </div>

            <p className="text-center text-lg leading-relaxed text-navyDark">
              {displayedProduct.description}
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

          {/* Properties */}
          <div className="w-full max-w-md self-center rounded-xl border bg-gray-50 p-4 shadow-inner">
            <h3 className="mb-4 text-xl font-bold lg:text-2xl">Properties</h3>
            <ul className="space-y-4 text-orangeMain md:text-lg lg:text-xl">
              <li><strong>Material:</strong> {displayedProduct.material || "Unknown"}</li>
              <li><strong>Collection:</strong> {displayedProduct.collection || "Unknown"}</li>
              <li><strong>Color:</strong> {displayedProduct.color}</li>
              <li><strong>Size:</strong> {displayedProduct.size || "Standard"}</li>
              <li><strong>Occasion:</strong> {displayedProduct.occasion || "Daily, Events"}</li>
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
