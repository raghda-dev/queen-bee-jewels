"use client"; // Mark this as a Client Component

import React from "react";
import "../../styles/global.scss";
import CompactCard from "./CompactCard"; // Assuming CompactCard is used for rendering products
import { Product } from "../home/data/products";

interface RelatedProductsScrollerProps {
  currentProduct: Product;
  recommendedProducts: Product[];
  onProductClick: (product: Product) => void;
}

const RelatedProductsScroller: React.FC<RelatedProductsScrollerProps> = ({
  currentProduct,
  recommendedProducts,
  onProductClick,
}) => {
  // Debugging currentProduct
  console.log("currentProduct:", currentProduct);

  // Validate currentProduct
  if (!currentProduct) {
    return <p className="text-gray-500">No current product available.</p>;
  }

  return (
    <div className="w-full flex flex-col items-start overflow-hidden py-8 px-4 md:px-8">
      <h2 className="mb-6 text-center font-josefin text-2xl font-bold text-black sm:text-3xl lg:text-4xl">
        Related Products
      </h2>

      {/* Scrollable container */}
      <div className="relative w-full overflow-x-auto scrollbar-hide custom-scrollbar">
        <div className="flex gap-2 px-2 sm:px-4 md:gap-6 lg:gap-8">
          {recommendedProducts.length > 0 ? (
            recommendedProducts.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[60vw] sm:w-[30vw] md:w-[20vw] lg:w-[15vw] mb-5 mr-5"
              >
                <CompactCard
                  img={product.viewImage1 || '/staticAssets/images/fallback.jpeg'} // Use fallback image
                  collectionName={product.collectionName}
                  price={product.price}
                  onClick={() => onProductClick(product)} // Handle click event
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

