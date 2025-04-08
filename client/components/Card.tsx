
import React from "react";
import Image, { StaticImageData } from "next/image";
import heartIcon from "../public/staticAssets/icons/HeartIcon.svg";

type CardProps = {
  img?: StaticImageData | string;
  collectionName?: string;
  description?: string;
  type?: string;
  price?: string;
  primaryButton?: React.ReactNode;
  secondaryButton?: React.ReactNode;
  size?: "small" | "medium" | "large"; // size prop
};

const Card: React.FC<CardProps> = ({
  img,
  collectionName,
  description,
  type,
  price,
  primaryButton,
  secondaryButton,
  size = "large", // Default to 'large' if no size is provided
}) => {
  // Define the sizes for small, medium, and large
  const sizeClasses = {
    small: "w-[50vw] h-[40vh] xs:w-[30vh] xs:h-[45vh] md:w-[22rem] md:h-[45vh]",
    medium: "w-[80vw] h-[50vh] xs:w-[60vw] xs:h-[50vh] md:w-[23rem] md:h-[50vh]",
    large: "w-[80vw] min-w-[10rem] max-w-[20rem] h-[50vh] text-center xs:w-[60vw] xs:min-w-[10rem] xs:max-w-[22rem] gap-y-4 md:max-w-[23rem] md:h-[56vh] md:max-h-[60vh] lg:w-[25vw] lg:max-w-[25rem] xl:h-[53vh]",
  };

  return (
    <div
      className={`relative z-10 inline-flex flex-col ${sizeClasses[size]} items-center justify-between cursor-pointer
      overflow-hidden rounded-xl bg-grayLight bg-opacity-80 px-4 py-4 border-2 border-lightCyan transition-transform duration-700 hover:scale-105 hover:shadow-lg`}
    >
      {/* Image Wrapper */}
      <div className="relative flex h-[20rem] w-[24rem] items-center justify-center overflow-hidden rounded-t-xl bg-grayLight">
        {/* Placeholder (Always Visible) */}
        <div className="absolute inset-0 flex items-center justify-center rounded-t-2xl bg-grayLight text-sm text-grayDark">
          No Image Available
        </div>

        {/* Conditional Image Rendering */}
        {img && (
          <Image src={img} alt="category-image" layout="fill" objectFit="cover" />
        )}
      </div>

      {/* Static Heart Icon */}
      <span className="relative z-10 my-2">
        <Image src={heartIcon} alt="heart icon" width={24} height={24} className="w-[2rem]" />
      </span>

      {/* Collection Name */}
      {collectionName && (
        <span className="bg-gradient-to-r from-orangeBrown via-orangeLight to-orangeRich bg-clip-text font-josefin text-xl sm:text-2xl text-transparent">
          {collectionName}
        </span>
      )}

      {/* Type & Price */}
      {type && <span className="text-lg font-medium">{type}</span>}
      {price && <span className="text-lg font-bold text-orangeRich">{price}</span>}

      {/* Description */}
      {description && <span className="text-md sm:text-xl">{description}</span>}

      {/* Buttons */}
      <div className="flex flex-col gap-2 w-full mt-4">
        {/* Only show the buttons if provided */}
        {primaryButton && (
          <div className="flex justify-center w-full">
            <div className="w-full flex gap-2 justify-center">
              {primaryButton}
              {secondaryButton && secondaryButton} {/* Show second button if passed */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
