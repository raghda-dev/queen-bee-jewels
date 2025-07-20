// client/app/(main)/home/@modal/(.)cart/components/CartItem.tsx

'use client';

import Image from 'next/image';
import { Trash2, Heart, Minus, Plus } from 'lucide-react';
import { CartItemType } from '../../../../types/Cart';
import { motion, AnimatePresence } from 'framer-motion';

type CartItemProps = {
  item: CartItemType;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
  onWishlist: (id: string) => void;
};

export default function CartItem({
  item,
  onIncrement,
  onDecrement,
  onRemove,
  onWishlist,
}: CartItemProps) {
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
            <span className="text-md bg-gradient-to-r from-gradientStart via-gradientMid to-gradientEnd bg-clip-text font-josefin font-bold text-transparent md:text-lg lg:text-xl">
              ${item.price.toFixed(2)}
            </span>
            {item.oldPrice && (
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
          {/* Quantity */}
          <div className="flex items-center gap-2 rounded-md border px-2 py-1">
            <motion.button
              whileTap={{ scale: 1.1 }}
              onClick={() => onDecrement(item.id)}
            >
              <Minus className="h-4 w-4 text-gray-600 hover:text-black" />
            </motion.button>

            <div className="relative h-5 w-5 overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={item.quantity}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center text-sm font-semibold"
                >
                  {item.quantity}
                </motion.span>
              </AnimatePresence>
            </div>

            <motion.button
              whileTap={{ scale: 1.1 }}
              onClick={() => onIncrement(item.id)}
            >
              <Plus className="h-4 w-4 text-gray-600 hover:text-black" />
            </motion.button>
          </div>

          {/* Trash + Move to Wishlist with Tooltip */}
          <div className="flex gap-3">
            <button onClick={() => onRemove(item.id)}>
              <Trash2 className="h-5 w-5 text-orangeRich transition-transform duration-300 hover:scale-125" />
            </button>

            <div className="relative group">
              <button onClick={() => onWishlist(item.id)}>
                <Heart className="h-5 w-5 text-mutedRed transition-transform duration-300 hover:scale-125" />
              </button>
              {/* Tooltip */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-navyDark px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                Move to Wishlist
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
