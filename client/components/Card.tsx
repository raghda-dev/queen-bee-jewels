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

      <div className="relative z-10 inline-flex flex-col w-[80vw] min-w-[10rem] max-w-[20rem] h-[50vh] text-center
      xs:w-[60vw] xs:min-w-[10rem] xs:max-w-[22rem]
      gap-y-4 md:max-w-[23rem] md:h-[56vh] md:max-h-[60vh]
       lg:w-[25vw] lg:max-w-[25rem] xl:h-[53vh]
       mb-2 mt-5
     items-center justify-between 
     overflow-hidden rounded-xl
     bg-grayLight bg-opacity-80 
     px-4 py-4 border-2 border-lightCyan transition-transform duration-700 hover:scale-105 hover:shadow-lg">
      {/* Image Wrapper */}
      <div className="relative flex h-[20rem] w-[24rem] items-center justify-center overflow-hidden rounded-t-xl bg-grayLight">
        {/* Placeholder (Always Visible) */}
        <div className="absolute inset-0 flex items-center justify-center rounded-t-2xl bg-grayLight text-sm text-grayDark">
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
      <Button size='medium'
        variant="textButton"
        color="var(--deep-brown)"
        animation='bounce'
        rightIcon={<span>→</span>}
      >
        See More
      </Button>
    </div>
  );
};

export default Card;
