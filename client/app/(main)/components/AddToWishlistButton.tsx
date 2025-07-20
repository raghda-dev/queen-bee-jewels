//client/app/(main)/components/AddToWishlistButton.tsx

// client/app/(main)/components/AddToWishlistButton.tsx

'use client'

import React from 'react'
import { useAppDispatch } from '../lib/redux/hooks'
import { addToWishlistAsync, getWishlistAsync } from '../lib/redux/wishlist/wishlistActions'
import Button from './Button'
import { ShopifyProduct } from '../../../../lib/shopify/products/types';

type Props = { product: ShopifyProduct }

export default function AddToWishlistButton({ product }: Props) {
  const dispatch = useAppDispatch()

  const handleAdd = async () => {
    const plainId = product.id.split('/').pop()

    if (!plainId) {
      console.error('Invalid product ID:', product.id)
      return
    }

    await dispatch(addToWishlistAsync(plainId))
    dispatch(getWishlistAsync()) // ✅ Refetch full data to update local state
  }

  return (
    <Button
      variant="primary"
      size="small"
      animation="bounce"
      onClick={handleAdd}
      color="var(--purple-light)"
      rightIcon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-6 w-6 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
         2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 
         14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
         6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      }
    >
      Add to wishlist
    </Button>
  )
}
