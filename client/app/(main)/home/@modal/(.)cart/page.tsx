//client/app/(main)/home/@modal/(.)cart/page.tsx

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import CartItem from './components/CartItem';
import Button from '../../../components/Button';
import '../../../../styles/global.scss';
import usePreviousPath from '../../../utils/usePrevPath';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from 'app/(main)/lib/redux/store';
import {
  removeFromCartAsync,
  moveToWishlistAsync,
} from '../../../lib/redux/cart/cartActions';
import { AnimatePresence } from 'framer-motion';
import OrderSummary from '../../../components/OrderSummary';
import {
  incrementQuantity,
  decrementQuantity,
} from '../../../lib/redux/cart/cartSlice';

export default function CartModal() {
  const router = useRouter();
  const previousPath = usePreviousPath();
  const dispatch = useDispatch<AppDispatch>();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = 5;
  const shipping = 10;
  const totalPrice = subtotal - discount + shipping;

  const closeModal = () => {
    router.push(previousPath || '/home');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="bg-black/40 fixed inset-0 z-40 backdrop-blur-sm"
        onClick={(e) => {
          e.stopPropagation();
          closeModal();
        }}
      />
      <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
        <div className="relative bottom-2 h-[96vh] w-[76vw] rounded-t-2xl bg-white p-5 pb-6 shadow-lg xs:h-[90vh] sm:h-[89vh] sm:rounded-2xl md:bottom-1 md:h-[88vh] md:pb-12 lg:bottom-0 xl:h-[60rem]">
          <div className="flex items-center justify-between border-b sm:mb-4 md:mb-0 md:pb-6">
            <h2 className="text-xl font-semibold sm:text-2xl md:text-3xl">
              Cart
            </h2>
            <div className="flex gap-7">
              <div className="flex">
                <Button
                  variant="textButton"
                  size="medium"
                  color="var(--muted-red)"
                  shape="rectangle"
                  animation="text-underline"
                  underlineDirection="from-right"
                  leftIcon={<span>←</span>}
                  rightIcon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-6 w-5 text-mutedRed underline"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.1"
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
                  onClick={() =>
                    router.push('/home/wishlist', { scroll: false })
                  }
                >
                  Go to Wishlist
                </Button>
              </div>
              <button onClick={closeModal}>
                <X className="h-5 w-5 text-gray-600 hover:text-black" />
              </button>
            </div>
          </div>

          {/* Cart + Summary Wrapper */}
          <div className="lg:flex lg:h-[60vh] lg:space-x-6">
            {/* Items Panel */}
            <div className="custom-scrollbar h-[55vh] flex-1 overflow-y-auto px-1 pt-4 xs:h-[45vh] sm:px-2 lg:h-[80vh] lg:px-7">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {cartItems.length === 0 ? (
                  <p className="text-gray-500">Your cart is empty.</p>
                ) : (
                  <AnimatePresence mode="popLayout">
                    {cartItems.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onIncrement={(id) => dispatch(incrementQuantity(id))}
                        onDecrement={(id) => dispatch(decrementQuantity(id))}
                        onRemove={(id) => dispatch(removeFromCartAsync(id))}
                        onWishlist={(id) => dispatch(moveToWishlistAsync(id))}
                      />
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </div>

            {/* Summary Panel */}
            <div className="lg:h-full lg:p-7">
              <OrderSummary
                subtotal={subtotal}
                discount={discount}
                shipping={shipping}
                totalPrice={totalPrice}
                buttonType="checkout"
                estimatedDelivery="20-05-2025"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
