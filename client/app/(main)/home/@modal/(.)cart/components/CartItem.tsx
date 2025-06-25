// client/app/(main)/home/@modal/(.)cart/components/CartItem.tsx

'use client'

import Image from 'next/image'
import { Trash2, Heart, Minus, Plus } from 'lucide-react'
import { CartItemType } from '../../../../types/Cart'

type CartItemProps = {
  item: CartItemType
  onIncrement: (id: string) => void
  onDecrement: (id: string) => void
  onRemove: (id: string) => void
  onWishlist: (id: string) => void
}

export default function CartItem({
  item,
  onIncrement,
  onDecrement,
  onRemove,
  onWishlist,
}: CartItemProps) {
  return (
    <div className="flex gap-4 rounded-xl p-2 bg-white shadow-sm border border-grayMedium sm:h-56 xl:h-64 lg:mb-5 transition-transform duration-700 hover:scale-105 hover:shadow-lg">
      {/* Image */}
      <div className="relative w-[90%] xs:w-[50%] sm:w-[98%] min-w-[9rem] h-56 xl:h-64 rounded-lg overflow-hidden border border-gray-200">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          sizes="256px"
          className="object-cover"
        />
      </div>

      {/* Info + Actions */}
      <div className="flex flex-col justify-evenly items-center border px-5 rounded-md h-[22vh] border-grayMedium mb-2">
        {/* Info */}
        <div className='items-center justify-center'>
          <h3 className="text-md font-semibold xs:text-lg font-josefin flex w-full">{item.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-md md:text-lg lg:text-xl font-bold font-josefin bg-gradient-to-r from-gradientStart via-gradientMid to-gradientEnd bg-clip-text text-transparent">
              ${item.price.toFixed(2)}
            </span>
            {item.oldPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${item.oldPrice.toFixed(2)}
              </span>
            )}
          </div>
          <p className="text-sm font-medium sm:text-md text-grayDark mt-1 line-clamp-2">
            {item.description}
          </p>
          <p className="text-sm text-navyMedium mt-1">
            Type: <span className="font-medium">{item.type}</span>
          </p>
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center justify-between gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center gap-2 border px-2 py-1 rounded-md">
            <button onClick={() => onDecrement(item.id)}>
              <Minus className="w-4 h-4 text-gray-600 hover:text-black" />
            </button>
            <span className="text-sm font-medium">{item.quantity}</span>
            <button onClick={() => onIncrement(item.id)}>
              <Plus className="w-4 h-4 text-gray-600 hover:text-black" />
            </button>
          </div>
          {/* Icons aligned right */}
          <div className="flex gap-3">
            <button onClick={() => onRemove(item.id)}>
              <Trash2 className="w-5 h-5 text-orangeRich" />
            </button>
            <button onClick={() => onWishlist(item.id)}>
              <Heart className="w-5 h-5 text-mutedRed" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
