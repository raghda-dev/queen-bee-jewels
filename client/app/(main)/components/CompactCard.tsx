// components/CompactCard.tsx
import React from 'react';
import Image, { StaticImageData } from 'next/image';
import fallbackImage from '../../../public/staticAssets/images/fallback.jpeg';

export type CompactCardProps = {
  img?: string | StaticImageData;
  collectionName?: string;
  price?: string | number; // Updated: optional and accepts number
  onClick?: () => void;
  context?: string;
};

const CompactCard: React.FC<CompactCardProps> = ({
  img,
  collectionName,
  price,
  onClick,
}) => {
  const safeImgSrc: string | StaticImageData =
    typeof img === 'string'
      ? img.trim() || fallbackImage
      : img ?? fallbackImage;

  return (
    <div
      onClick={onClick}
      className="relative z-10 inline-flex h-[25rem] w-[16rem] lg:w-[19rem] lg:h-[28rem] flex-col cursor-pointer items-center justify-start overflow-hidden rounded-xl bg-grayLight bg-opacity-80 p-2 transition-transform duration-700 hover:scale-105 hover:shadow-md"
    >
      {/* Image Section */}
      <div className="relative h-[60%] w-full overflow-hidden rounded-xl bg-grayLight">
        <Image
          src={safeImgSrc}
          alt={collectionName || 'Product Image'}
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Content Section */}
      <div className="flex h-[40%] w-full flex-col items-center justify-center gap-1 pt-3">
        <span className="text-orangeMain font-josefin text-lg font-medium sm:text-lg md:text-xl lg:text-2xl capitalize text-center">
          {collectionName}
        </span>
        <span className="text-md sm:text-lg md:text-xl font-bold text-orangeRich text-center">
          {price !== undefined ? `${price}` : 'N/A'}
        </span>
      </div>
    </div>
  );
};

export default CompactCard;
