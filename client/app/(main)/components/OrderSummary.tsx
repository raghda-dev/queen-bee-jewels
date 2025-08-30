// client/app/(main)/components/OrderSummary.tsx

'use client';

import React, { useMemo } from 'react';
import Button from './Button';
import Link from 'next/link';

interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  shipping: number;
  totalPrice: number;
  buttonType?: 'checkout' | 'placeOrder';
  checkoutHref?: string;
  onPlaceOrder?: () => void;
  estimatedDelivery?: string; // optional override
  className?: string;
}

export default function OrderSummary({
  subtotal,
  discount,
  shipping,
  totalPrice,
  buttonType = 'checkout',
  checkoutHref = '/checkout',
  onPlaceOrder,
  estimatedDelivery,
  className,
}: OrderSummaryProps) {
  // Compute estimated delivery = today + 15 days
  const deliveryDate = useMemo(() => {
    if (estimatedDelivery) return estimatedDelivery; // allow override
    const date = new Date();
    date.setDate(date.getDate() + 15);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [estimatedDelivery]);

  return (
    <div
      className={`flex flex-col justify-between h-[29vh] lg:h-[32rem] xl:h-[35rem] lg:w-[22rem] xl:w-96 rounded-xl border-2 border-orangeMedium bg-white p-6 shadow-md ${className || ''}`}
    >
      {/* Top Content */}
      <div>
        <h3 className="mb-1 text-lg font-semibold text-grayDark">Order Summary</h3>

        <div className="text-md space-y-2 lg:space-y-7 lg:mb-10 font-medium text-grayDark md:text-lg">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount:</span>
            <span className="text-pinkish">-${discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t pt-4 text-base font-semibold lg:text-lg">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Action Button */}
        {buttonType === 'checkout' ? (
          <Link href={checkoutHref} className="mt-4 block">
            <Button size="small" shape="rectangle" color="var(--muted-red)">
              Proceed to Checkout
            </Button>
          </Link>
        ) : (
          <div className="mt-4">
            <Button
              size="small"
              shape="rectangle"
              color="var(--muted-red)"
              onClick={onPlaceOrder}
              className="w-full"
            >
              Place Order
            </Button>
          </div>
        )}
      </div>

      {/* Footer pinned to bottom */}
      <div className="mt-6 border-t pt-4">
        <p className="text-center text-sm text-gray-500">
          Estimated Delivery by{' '}
          <span className="font-medium text-black">{deliveryDate}</span>
        </p>
      </div>
    </div>
  );
}
