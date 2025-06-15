//client/app/(main)/home/product/[handle]/ProductPage.tsx

'use client';

import React, { useState } from 'react';
import { ShopifyProduct } from '../../../lib/shopify/types';
import ProductDetailsClient from './ProductDetailsClient';
import RelatedProductsScroller from './RelatedProductsScroller';

interface ProductPageProps {
  initialProduct: ShopifyProduct;
  recommendedProducts: ShopifyProduct[];
}

const ProductPage: React.FC<ProductPageProps> = ({
  initialProduct,
  recommendedProducts,
}) => {
  const [selectedProduct, setSelectedProduct] =
    useState<ShopifyProduct>(initialProduct);

  const handleProductClick = (product: ShopifyProduct) => {
    setSelectedProduct(product);
  };

  return (
    <>
      <ProductDetailsClient
        product={selectedProduct}
        recommendedProducts={recommendedProducts}
      />

      <RelatedProductsScroller
        currentProduct={selectedProduct}
        recommendedProducts={recommendedProducts}
        onProductClick={handleProductClick}
      />
    </>
  );
};

export default ProductPage;
