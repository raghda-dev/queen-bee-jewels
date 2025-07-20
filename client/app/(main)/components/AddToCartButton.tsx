//client/app/(main)/components/AddToCartButton.tsx

'use client';

import React, { useState } from 'react';
import { useAppDispatch } from '../lib/redux/hooks'; 
import { addToCartAsync } from '../lib/redux/cart/cartActions';
import Button from './Button';
import { ShopifyProduct } from '../../../../lib/shopify/products/types';
import { ShoppingCart } from 'lucide-react';

type Props = { product: ShopifyProduct };

export default function AddToCartButton({ product }: Props) {
  const dispatch = useAppDispatch(); // ✅ Correct!
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAdd = async () => {
    dispatch(
      addToCartAsync({
        id: product.id,
        name: product.title,
        price: parseFloat(product.priceRange.minVariantPrice.amount),
        imageUrl: product.featuredImage?.url || '',
        quantity: 1,
        description: product.description || 'No description available',
        type: product.productType || 'General',
      })
    );

    // optional: you do NOT need this POST below if your thunk already does it
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <Button
      variant="primary"
      size="small"
      animation="bounce"
      onClick={handleAdd}
      color="var(--purple-light)"
      rightIcon={
        <ShoppingCart
          size={16}
          className={`cart-icon ${isAnimating ? 'rotate-pop' : ''}`}
        />
      }
    >
      Add to Cart
    </Button>
  );
}
