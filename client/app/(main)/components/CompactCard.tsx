
// components/CompactCard.tsx

import React from 'react';
import Image from 'next/image';
import { CardProps } from './Card'; // Import type if needed

type CompactCardProps = CardProps & {
  context?: string;
  onClick?: () => void;
};

const CompactCard: React.FC<CompactCardProps> = ({
  img,
  collectionName,
  price,
  onClick,
}) => {
  const fallbackImage = '/staticAssets/images/fallback.jpeg';

  // Function to determine if the image is a string or StaticImageData
  const isImageString = (src: unknown): src is string => typeof src === 'string';

  // Safely handle both string URLs and StaticImageData objects
  const safeImgSrc = isImageString(img)
    ? img.trim() !== '' // If it's a string, ensure it's not empty
      ? img
      : fallbackImage
    : img || fallbackImage; // If it's StaticImageData, use it directly or fallback

  return (
    <div
      onClick={onClick} // Handle click event
      className="relative z-10 inline-flex h-[25rem] w-[16rem] lg:w-[19rem] lg:h-[28rem] flex-col cursor-pointer items-center justify-start overflow-hidden rounded-xl border border-lightCyan bg-grayLight bg-opacity-80 p-2 transition-transform duration-700 hover:scale-105 hover:shadow-md"
    >
      {/* Image Section */}
      <div className="relative h-[60%] w-full overflow-hidden rounded-xl bg-grayLight">
        <Image
          src={safeImgSrc} // Use safe image source
          alt={collectionName || 'Product Image'}
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Content Section */}
      <div className="flex h-[40%] w-full flex-col items-center justify-center gap-1 pt-3">
        {collectionName && (
          <span className="bg-gradient-to-r from-orangeBrown via-orangeLight to-orangeRich bg-clip-text font-josefin text-base text-transparent sm:text-lg md:text-xl lg:text-2xl">
            {collectionName}
          </span>
        )}
        {price && (
          <span className="text-md sm:text-lg md:text-xl font-bold text-orangeRich">{price}</span>
        )}
      </div>
    </div>
  );
};

export default CompactCard;
