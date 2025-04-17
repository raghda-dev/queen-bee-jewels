'use client';
import React from 'react';
import '../styles/global.scss';
import CompactCard from './CompactCard';
import { Product } from ".././app/home/data/products";


type relatedProductsProps = {
  currentProduct: Product;
  recommendedProducts: Product[];
  onProductClick: (product: Product) => void;
};

const RelatedProductsScroller = ({
  // currentProduct,
  recommendedProducts,
  onProductClick,
}: relatedProductsProps) => {
  return (
    <div className="w-[85%] lg:w-full flex flex-col items-start overflow-hidden py-8 px-4 md:px-8">
      <h2 className="mb-6 text-center font-josefin text-2xl font-bold text-black sm:text-3xl lg:text-4xl">
        Related Products
      </h2>

      {/* Scrollable container */}
      <div className="relative w-full overflow-x-auto scrollbar-hide custom-scrollbar">
        <div className="flex gap-2 px-2 sm:px-4 md:gap-6 lg:gap-8">
          {recommendedProducts.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[60vw] sm:w-[30vw] md:w-[20vw] lg:w-[15vw] mb-5 mr-5"
            >
              <CompactCard
                img={product.viewImage1}
                collectionName={product.collectionName}
                price={product.price}
                onClick={() => onProductClick(product)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProductsScroller;

