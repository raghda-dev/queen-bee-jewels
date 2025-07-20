// client/app/(main)/components/Card.tsx

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image, { StaticImageData } from 'next/image';
import CompactCard from './CompactCard';

export type CardProps = {
  id?: string;
  handle?: string;
  title?: string;
  img?: StaticImageData | string;
  collectionName?: string;
  description?: string;
  price?: string | number;
  currencyCode?: string;
  productType?: string;
  vendor?: string;
  tags?: string[];
  images?: string[];
  primaryButton?: React.ReactNode;
  secondaryButton?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  context?: string;
  showHeart?: boolean;
};

const Card: React.FC<CardProps> = ({
  handle,
  title,
  img,
  collectionName,
  description,
  price,
  currencyCode,
  productType,
  primaryButton,
  secondaryButton,
  size = 'large',
  context,
  showHeart = false,
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    if (handle) router.push(`/home/product/${handle}`);
  };

  const cardSize = {
    small: 'w-[20rem] h-[50vh] md:min-h-[20rem] md:max-h-[33rem] min-w-[18rem] max-w-[20rem] md:min-w-[21rem]',
    medium:
      'w-[20rem] h-[53vh] min-h-[50vh] min-w-[21rem] max-w-[20rem] xs:min-w-[23rem] xs:max-w-[24rem] lg:min-w-[26rem] lg:max-w-[70rem] lg:min-h-[40rem]',
    large:
      'w-[60vw] min-w-[8rem] max-w-[20rem] h-[49vh] text-center xs:w-[57vw] xs:min-w-[10rem] xs:max-w-[22rem] xs:h-[53vh] gap-y-4 md:max-w-[23rem] md:h-[56vh] md:max-h-[60vh] lg:w-[23vw] lg:max-w-[23.5rem] xl:max-w-[25rem] xl:h-[53vh]',
  };

  if (context === 'related') {
    return (
      <CompactCard
        img={img}
        collectionName={collectionName || title}
        price={price}
        context={context}
      />
    );
  }

  return (
    <div
      onClick={handleCardClick}
      className={`relative z-10 flex flex-col shadow-md ${cardSize[size]} cursor-pointer items-center justify-between overflow-hidden rounded-xl bg-grayLight bg-opacity-80 px-4 py-4 transition-all duration-700 hover:scale-105 hover:shadow-lg`}
    >
      <div className="relative mb-6 h-[18rem] w-full overflow-hidden rounded-t-xl bg-grayLight">
        {!img ? (
          <div className="absolute inset-0 flex items-center justify-center rounded-t-xl bg-grayLight text-sm text-grayDark">
            No Image Available
          </div>
        ) : (
          <Image
            src={img}
            alt="Product Image"
            fill
            style={{ objectFit: 'cover' }}
          />
        )}
      </div>

      {showHeart && (
        <span className="relative z-10 my-1">
          <Image
            src="/staticAssets/icons/HeartIcon.svg"
            alt="heart icon"
            width={24}
            height={24}
            className="w-[2rem]"
          />
        </span>
      )}

      {(collectionName || title) && (
        <span className="font-josefin text-xl font-semibold capitalize text-orangeMain sm:text-2xl">
          {collectionName || title}
        </span>
      )}

      {productType && (
        <span className="text-md text-grayDark">{productType}</span>
      )}

      {price !== undefined && (
        <span className="text-lg font-bold text-orangeRich">
          {price} {currencyCode || ''}
        </span>
      )}

      {description && (
        <span className="text-md sm:text-base">{description}</span>
      )}

      {(primaryButton || secondaryButton) && (
        <div className="mt-4 flex w-full justify-center gap-2">
          {primaryButton && (
            <div
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            >
              {primaryButton}
            </div>
          )}
          {secondaryButton && (
            <div
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            >
              {secondaryButton}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
