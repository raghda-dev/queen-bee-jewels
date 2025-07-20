// client/app/(main)/home/@modal/(.)wishlist/page.tsx

'use client';

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import WishlistItem from './components/WishlistItem';
import usePreviousPath from '../../../utils/usePrevPath';
import { AnimatePresence } from 'framer-motion';
import { useSelector , useDispatch } from 'react-redux';
import { RootState , AppDispatch } from '../../../lib/redux/store';
import { removeFromWishlistAsync,
   moveToCartAsync } from '../../../lib/redux/wishlist/wishlistActions';
import { ShoppingCart } from 'lucide-react';
import Button from '../../../components/Button';

export default function WishlistModal() {
  const router = useRouter();
  const previousPath = usePreviousPath();
  const dispatch = useDispatch<AppDispatch>();
  

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const closeModal = () => {
  router.push(previousPath || '/home');
};

  return (
    <>
      <div
        className="bg-black/40 fixed inset-0 z-40 backdrop-blur-sm"
        onClick={(e) => {
          e.stopPropagation();
          closeModal();
        }}
      />
      <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
        <div className="relative bottom-5 h-[100vh] w-[76vw] rounded-t-2xl bg-white p-6 shadow-lg xs:h-[90vh] sm:h-[89vh] sm:rounded-2xl lg:bottom-0 lg:h-[59.5rem] xl:h-[64rem]">
          <div className="mb-4 flex items-center justify-between border-b pb-6 md:mb-0">
            <h2 className="text-xl font-semibold sm:text-2xl md:text-3xl">
              Wishlist
            </h2>
            <div className="flex gap-7">
              <div className="flex">
                <Button
                  variant="textButton"
                  size="medium"
                  color="var(--muted-red)"
                  shape='rectangle'
                  onClick={() => router.push('/home/cart', { scroll: false })}
                  leftIcon={<ShoppingCart size={14} />}
                  animation="text-underline"
                  rightIcon={<span>→</span>}
                  // className="text-md ml-2 font-semibold text-mutedRed underline transition-all duration-200 hover:text-purpleDark"
                >
                  Go to Cart
                </Button>
              </div>
              <button onClick={closeModal}>
                <X className="h-5 w-5 text-gray-600 hover:text-black" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence>
              {wishlistItems.length === 0 ? (
                <p className="text-gray-500">Your wishlist is empty.</p>
              ) : (
                wishlistItems.map((item) => (
                  <WishlistItem
                    key={item.id}
                    item={item}
                    onRemove={(id) => dispatch(removeFromWishlistAsync(id))}
                    onMoveToCart={(id) => dispatch(moveToCartAsync(id))}
                  />
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
