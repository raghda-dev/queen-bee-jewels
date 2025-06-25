// app/(main)/home/@modals/(.)cart/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import CartItem from './components/CartItem';
import Button from '../../../components/Button';
import '../../../../styles/global.scss';
import usePreviousPath from '../../../utils/usePrevPath';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from 'app/(main)/lib/redux/store';


export type CartItemType = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  description: string;
  type: string;
  quantity: number;
  imageUrl: string;
};

export default function CartModal() {
  const router = useRouter();
  const previousPath = usePreviousPath();

  // ✅ Moved useSelector inside the component
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // ❌ OLD: Mocked local cart state – no longer needed with Redux
  // const [cartItems, setCartItems] = useState<CartItemType[]>([
  //   {
  //     id: '1',
  //     name: 'Silver Ring',
  //     price: 20,
  //     oldPrice: 29.5,
  //     description: 'A timeless silver piece for elegance.',
  //     type: 'Silver',
  //     quantity: 1,
  //     imageUrl: cartImg,
  //   },
  //   ...
  // ]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = 5;
  const shipping = 10;
  const totalPrice = subtotal - discount + shipping;

  // ❌ OLD: Local state logic (no longer used with Redux)
  // const incrementQuantity = (id: string) => {
  //   setCartItems((prev) =>
  //     prev.map((item) =>
  //       item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  //     )
  //   );
  // };

  // const decrementQuantity = (id: string) => {
  //   setCartItems((prev) =>
  //     prev.map((item) =>
  //       item.id === id && item.quantity > 1
  //         ? { ...item, quantity: item.quantity - 1 }
  //         : item
  //     )
  //   );
  // };

  // const removeItem = (id: string) => {
  //   setCartItems((prev) => prev.filter((item) => item.id !== id));
  // };

  // const moveToWishlist = (id: string) => {
  //   console.log(`Moved item ${id} to wishlist`);
  //   removeItem(id);
  // };

  const closeModal = () => {
    router.push(previousPath);
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
        <div className="relative bottom-5 h-[100vh] xs:h-[90vh] sm:h-[89vh] w-[76vw] rounded-t-2xl bg-white p-6 shadow-lg sm:rounded-2xl lg:bottom-0 lg:h-[59.5rem] xl:h-[64rem]">
          <div className="mb-4 flex items-center justify-between border-b pb-6 md:mb-0">
            <h2 className="text-xl font-semibold sm:text-2xl md:text-3xl">
              Cart
            </h2>
            <button onClick={closeModal}>
              <X className="h-5 w-5 text-gray-600 hover:text-black" />
            </button>
          </div>

          {/* Cart + Summary Wrapper */}
          <div className="lg:flex lg:h-[60vh] lg:space-x-6">
            {/* Items Panel */}
            <div className="h-[55vh] xs:h-[45vh] lg:h-[80vh] overflow-y-auto custom-scrollbar px-1 sm:px-2 lg:px-7 flex-1 pt-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {cartItems.length === 0 ? (
                  <p className="text-gray-500">Your cart is empty.</p>
                ) : (
                  cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      // 🚧 Redux actions to be connected later
                      onIncrement={() => {}}
                      onDecrement={() => {}}
                      onRemove={() => {}}
                      onWishlist={() => {}}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Summary Panel */}
            <div className="flex-shrink-0 p-4 lg:w-96">
              <div className="flex h-[30vh] lg:h-[45vh] flex-col justify-between rounded-xl border-2 border-orangeMedium bg-white p-6 shadow-md">
                <h3 className="mb-4 text-lg font-semibold text-grayDark">
                  Order Summary
                </h3>
                <div className="space-y-2 text-md md:text-lg font-medium text-grayDark">
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
                  <div className="flex justify-between border-t pt-4 text-base lg:text-lg font-semibold">
                    <span>Total:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <Link href="/checkout" className="mt-4">
                  <Button size="small" shape="rectangle" color="var(--muted-red)">
                    Proceed to Checkout
                  </Button>
                </Link>
                <hr className="my-4" />
                <p className="text-center text-sm text-gray-500">
                  Estimated Delivery by{' '}
                  <span className="font-medium text-black">20-05-2025</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
