import React from 'react';
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
  id,
  handle,
  title,
  img,
  collectionName,
  description,
  price,
  currencyCode,
  productType,
  vendor,
  tags,
  images,
  primaryButton,
  secondaryButton,
  size = 'large',
  context,
  showHeart = false,
}) => {
  const cardSize = {
    small:
      'w-[50vw] h-[40vh] xs:w-[30vh] xs:h-[45vh] md:w-[20rem] md:h-[45vh] md:max-w-[26rem]',
    medium:
      'w-[60vw] max-w-[21rem] h-[50vh] xs:w-[60vw] md:h-[48vh] md:w-[23rem] md:h-[50vh] lg:max-w-[22rem] lg:h-[50vh]',
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
      className={`shadow-md relative z-10 inline-flex flex-col ${cardSize[size]} cursor-pointer items-center justify-between overflow-hidden rounded-xl bg-grayLight bg-opacity-80 px-4 py-4 transition-transform duration-700 hover:scale-105 hover:shadow-lg`}
    >
      <div className="relative flex h-[20rem] mb-6 w-[24rem] items-center justify-center overflow-hidden rounded-t-xl bg-grayLight">
        {!img ? (
          <div className="absolute inset-0 flex items-center justify-center rounded-t-2xl bg-grayLight text-sm text-grayDark">
            No Image Available
          </div>
        ) : (
          <Image
            src={img}
            alt="Product Image"
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

      {(collectionName || title) && (
        <span className="font-josefin text-xl text-orangeMain font-semibold sm:text-2xl capitalize">
          {collectionName || title}
        </span>
      )}

      {productType && <span className="text-md text-grayDark">{productType}</span>}

      {price !== undefined && (
        <span className="text-lg font-bold text-orangeRich">
          {price} {currencyCode || ''}
        </span>
      )}

      {description && <span className="text-md sm:text-base">{description}</span>}

      <div className="mt-4 flex w-full flex-col gap-2">
        {primaryButton && (
          <div className="flex w-full justify-center">
            <div className="flex w-full justify-center gap-2">
              {primaryButton}
              {secondaryButton}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
