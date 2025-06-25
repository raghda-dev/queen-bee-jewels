// AddToCartButton.tsx
'use client';

import { useDispatch } from 'react-redux';
import { addToCart } from '../lib/redux/cartSlice';
import Button from './Button';
import { ShopifyProduct } from '../lib/shopify/products/types'; // ✅ import type

type Props = {
  product: ShopifyProduct;
};

export default function AddToCartButton({ product }: Props) {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(
    addToCart({
      id: product.id,
      name: product.title, // ✅ was `title`
      price: parseFloat(product.priceRange.minVariantPrice.amount),
      imageUrl: product.featuredImage?.url || '',
      quantity: 1,
      description: product.description || 'No description available', // ✅ add description
      type: product.productType || 'General', // ✅ add type
    })
    );
  };

  return (
    <Button
      size="small"
      variant="primary"
      color="var(--purple-light)"
      animation="bounce"
      onClick={handleAdd}
    >
      Add to Cart
    </Button>
  );
}
