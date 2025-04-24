// components/Card.tsx

import React from 'react';
import Image, { StaticImageData } from 'next/image';
// import heartIcon from '../../public/staticAssets/icons/HeartIcon.svg';
import CompactCard from './CompactCard';

export type CardProps = {
  img?: StaticImageData | string;
  collectionName?: string;
  description?: string;
  type?: string;
  price?: string;
  primaryButton?: React.ReactNode;
  secondaryButton?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  context?: string; // Add this to check layout context
};

const Card: React.FC<CardProps> = ({
  img,
  collectionName,
  description,
  type,
  price,
  primaryButton,
  secondaryButton,
  size = 'large',
  context,
}) => {
  const sizeClasses = {
    small:
      'w-[50vw] h-[40vh] xs:w-[30vh] xs:h-[45vh] md:w-[20rem] md:h-[45vh] md:max-w-[26rem]',
    medium:
      'w-[60vw] max-w-[21rem] h-[50vh] xs:w-[60vw] md:h-[48vh] md:w-[23rem] md:h-[50vh] lg:max-w-[22rem] lg:h-[50vh]',
    large:
      'w-[80vw] min-w-[10rem] max-w-[20rem] h-[50vh] text-center xs:w-[60vw] xs:min-w-[10rem] xs:max-w-[22rem] gap-y-4 md:max-w-[23rem] md:h-[56vh] md:max-h-[60vh] lg:w-[25vw] lg:max-w-[25rem] xl:h-[53vh]',
  };

  if (context === 'related') {
    return (
      <CompactCard
        img={img}
        collectionName={collectionName}
        price={price}
        context={context}
      />
    );
  }


  return (
    <div
      className={`relative z-10 inline-flex flex-col ${sizeClasses[size]} cursor-pointer items-center justify-between overflow-hidden rounded-xl border-2 border-lightCyan bg-grayLight bg-opacity-80 px-4 py-4 transition-transform duration-700 hover:scale-105 hover:shadow-lg`}
    >
      <div className="relative flex h-[20rem] w-[24rem] items-center justify-center overflow-hidden rounded-t-xl bg-grayLight">
        <div className="absolute inset-0 flex items-center justify-center rounded-t-2xl bg-grayLight text-sm text-grayDark">
          No Image Available
        </div>

        {img && img !== '' ? (
          <Image
            src={img}
            alt="category-image"
            layout="fill"
            objectFit="cover"
          />
        ) : null}
      </div>

      <span className="relative z-10 my-2">
        <Image
          src='/staticAssets/icons/HeartIcon.svg'
          alt="heart icon"
          width={24}
          height={24}
          className="w-[2rem]"
        />
      </span>

      {collectionName && (
        <span className="bg-gradient-to-r from-orangeBrown via-orangeLight to-orangeRich bg-clip-text font-josefin text-xl text-transparent sm:text-2xl">
          {collectionName}
        </span>
      )}

      {type && <span className="text-lg font-medium">{type}</span>}
      {price && (
        <span className="text-lg font-bold text-orangeRich">{price}</span>
      )}

      {description && <span className="text-md sm:text-xl">{description}</span>}

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
