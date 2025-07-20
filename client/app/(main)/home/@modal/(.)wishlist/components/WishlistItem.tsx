// client/app/(main)/home/@modal/(.)wishlist/components/WishlistItem.tsx

'use client';

import Image from 'next/image';
import { Trash2, ShoppingCart } from 'lucide-react';
import { WishlistItemType } from '../../../../types/Cart';
import { motion } from 'framer-motion';

type WishlistItemProps = {
  item: WishlistItemType;
  onRemove: (id: string) => void;
  onMoveToCart: (id: string) => void;
};

export default function WishlistItem({
  item,
  onRemove,
  onMoveToCart,
}: WishlistItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: -100, scale: 0.8 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="flex gap-4 rounded-xl border border-grayMedium bg-white p-2 shadow-sm transition-transform duration-700 hover:scale-105 hover:shadow-lg sm:h-56 lg:mb-5 xl:h-64"
    >
      {/* Image */}
      <div className="relative h-56 w-[90%] min-w-[9rem] overflow-hidden rounded-lg border border-gray-200 xs:w-[50%] sm:w-[98%] xl:h-64">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          sizes="256px"
          className="object-cover"
        />
      </div>

      {/* Info + Actions */}
      <div className="mb-2 flex h-[22vh] flex-col items-center justify-evenly rounded-md border border-grayMedium px-5">
        <div className="items-center justify-center">
          <h3 className="text-md flex w-full font-josefin font-semibold xs:text-lg">
            {item.name}
          </h3>
          <div className="mt-1 flex items-center gap-2">
            {/* <span className="text-md bg-gradient-to-r from-gradientStart via-gradientMid to-gradientEnd bg-clip-text font-josefin font-bold text-transparent md:text-lg lg:text-xl">
              ${item.price.toFixed(2)}
            </span> */}
            <span className="text-md bg-gradient-to-r from-gradientStart via-gradientMid to-gradientEnd bg-clip-text font-josefin font-bold text-transparent md:text-lg lg:text-xl">
              {item.price !== undefined ? `$${item.price.toFixed(2)}` : 'N/A'}
            </span>

            {/* {item.oldPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${item.oldPrice.toFixed(2)}
              </span>
            )} */}
            {item.oldPrice !== undefined && (
              <span className="text-xs text-gray-400 line-through">
                ${item.oldPrice.toFixed(2)}
              </span>
            )}
          </div>
          <p className="sm:text-md mt-1 line-clamp-2 text-sm font-medium text-grayDark">
            {item.description}
          </p>
          <p className="mt-1 text-sm text-navyMedium">
            Type: <span className="font-medium">{item.type}</span>
          </p>
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center justify-between gap-4">
          {/* No Quantity for wishlist */}

          {/* Trash + Move to Cart */}
          <div className="flex gap-3">
            <button onClick={() => onRemove(item.id)}>
              <Trash2 className="h-5 w-5 text-orangeRich transition-transform duration-300 hover:scale-125" />
            </button>
            <div className="group relative">
              <button onClick={() => onMoveToCart(item.id)}>
                <ShoppingCart className="h-5 w-5 text-mutedRed transition-transform duration-300 hover:scale-125" />
              </button>
              {/* Tooltip */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-navyDark px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                Move to Cart
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
