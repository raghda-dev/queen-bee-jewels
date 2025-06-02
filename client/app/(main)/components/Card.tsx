// components/Card.tsx

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import CompactCard from './CompactCard';


export type CardProps = {
  id?: string;
  title?: string;
  handle?: string;
  description?: string;
  image?: StaticImageData | string;
  images?: (StaticImageData | string)[];
  price?: string;
  currencyCode?: string;
  productType?: string;
  vendor?: string;
  tags?: string[];
  collectionName?: string;
  type?: string;
  primaryButton?: React.ReactNode;
  secondaryButton?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  context?: string;
  showHeart?: boolean;
};

const Card: React.FC<CardProps> = ({
  title,
  // handle,
  collectionName,
  description,
  image,
  images,
  price,
  currencyCode,
  productType,
  // vendor,
  // tags,
  // type,
  primaryButton,
  secondaryButton,
  size = 'large',
  context,
  showHeart = false,
}) => {
  const cardSize = {
    small:'w-[20rem] h-[50vh] md:min-h-[20rem] md:max-h-[33rem] min-w-[18rem] max-w-[20rem] md:min-w-[21rem]',
    medium:'w-[20rem] h-[53vh] min-h-[50vh] min-w-[21rem] max-w-[20rem] xs:min-w-[23rem] xs:max-w-[24rem] lg:min-w-[26rem] lg:max-w-[70rem] lg:min-h-[40rem]',
    large:'w-[60vw] min-w-[8rem] max-w-[20rem] h-[49vh] text-center xs:w-[57vw] xs:min-w-[10rem] xs:max-w-[22rem] xs:h-[53vh] gap-y-4 md:max-w-[23rem] md:h-[56vh] md:max-h-[60vh] lg:w-[23vw] lg:max-w-[23.5rem] xl:max-w-[25rem] xl:h-[53vh]',
  };

  if (context === 'related') {
    return (
      <CompactCard
        img={image}
        collectionName={collectionName || title}
        price={`${price ?? ''} ${currencyCode ?? ''}`}
        context={context}
      />
    );
  }

  const finalImage = image || (images && images.length > 0 ? images[0] : '');

  return (
    <div
      className={`relative z-10 flex flex-col shadow-md ${cardSize[size]} cursor-pointer items-center justify-between overflow-hidden rounded-xl bg-grayLight
       bg-opacity-80 px-4 py-4 transition-all duration-700 hover:scale-105 hover:shadow-lg`}
    >
      <div className="relative mb-6 h-[18rem] w-full overflow-hidden rounded-t-xl bg-grayLight">
        {!finalImage ? (
          <div className="absolute inset-0 flex items-center justify-center bg-grayLight text-sm text-grayDark">
            No Image Available
          </div>
        ) : (
          <Image
            src={finalImage}
            alt={title || 'Product Image'}
            layout="fill"
            objectFit="cover"
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

      {title && (
        <span className="font-josefin text-xl font-semibold capitalize text-orangeMain sm:text-2xl">
          {title}
        </span>
      )}

      {productType && (
        <span className="text-md text-grayDark">{productType}</span>
      )}

      {price && (
        <span className="text-lg font-bold text-orangeRich">
          {price} {currencyCode}
        </span>
      )}

      {description && (
        <span className="text-md sm:text-base">{description}</span>
      )}

      <div className="mt-4 flex w-full flex-col gap-2">
        {primaryButton && (
          <div className="flex w-full justify-center">
            <div className="flex w-full justify-center gap-2">
              {primaryButton}
              {secondaryButton && secondaryButton}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
