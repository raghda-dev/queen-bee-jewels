import React, { ReactNode } from 'react';
import Image, { StaticImageData } from 'next/image';
import Button from '../components/Button';
import heartIcon from '../public/staticAssets/icons/HeartIcon.svg';

type CardProps = {
  img?: StaticImageData | string; // Accept static imports or URL string
  collectionName?: ReactNode;
  description?: ReactNode;
};

const Card: React.FC<CardProps> = ({ img, collectionName, description }) => {
  return (

      <div className="relative z-10 inline-flex flex-col 
      start:max-w-96 start:gap-y-4 md:max-w-[25rem] md:h-[38rem] md:max-h-[40rem]
      lg:max-h-[100em] mb-2
    items-center justify-between 
    overflow-hidden rounded-xl
    bg-grayLight bg-opacity-80 
    px-4 py-4 border-2 border-lightCyan">
      {/* Image Wrapper */}
      <div className="relative flex h-[17rem] w-[24rem] items-center justify-center overflow-hidden rounded-t-xl bg-grayLight">
        {/* Placeholder (Always Visible) */}
        <div className="absolute inset-0 flex items-center justify-center rounded-t-3xl bg-grayLight text-sm text-grayDark">
          No Image Available
        </div>

        {/* Conditional Image Rendering */}
        {img && (
          <Image
            src={img}
            alt="category-image"
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>

      {/* Static Heart Icon */}
      <span className="relative z-10 mt-5">
        <Image src={heartIcon} alt="heart icon" width={24} height={24} />
      </span>

      {/* Collection Name */}
      {collectionName && (
        <span className="bg-gradient-to-r from-orangeBrown via-orangeLight to-orangeRich bg-clip-text font-josefin text-2xl text-transparent">
          {collectionName}
        </span>
      )}

      {/* Description */}
      {description && <span className="text-xl">{description}</span>}

      {/* Button */}
      <Button
        variant="textButton"
        color="var(--deep-brown)"
        rightIcon={<span>→</span>}
      >
        See More
      </Button>
    </div>
  );
};

export default Card;
