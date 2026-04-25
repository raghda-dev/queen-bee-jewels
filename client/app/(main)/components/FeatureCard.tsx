// client/app/(main)/component/FeatureCard.tsx

import React, { ReactNode } from "react";
import Image, { StaticImageData } from "next/image";



type FeatureCardProps = {
    icon?: StaticImageData | string | ReactNode;
    feature?: string;
    description?: string;
  };
  
  const FeatureCard: React.FC<FeatureCardProps> = ({ icon, feature, description }) => {
    return (
      <div className="feature-card bg-white flex flex-col space-x-1 space-y-3 items-center justify-center px-4 py-4 h-[42vh] lg:h-[44vh] w-[100vw] min-w-[20rem] max-w-[5rem] xs:w-[60vw]
       xs:min-w-[22rem] xs:max-w-[10rem] md:w-[29vw] md:min-w-[21rem] lg:w-[50vw] lg:max-w-[22rem] lg:min-w-[23rem] rounded-md mb-5
         transition-transform duration-700 hover:scale-105 hover:shadow-lg cursor-pointer">
        <div className="flex flex-col items-center justify-evenly h-[70%] w-[70%] text-center">
        {/* Ensure icon exists before rendering Image */}
        <div>
          {icon ? (
            <Image src={icon as string | StaticImageData} alt="icon-image" width={50} height={40} className="w-20 h-20"/>
          ) : (
            <div className="default-icon">-</div> // Fallback icon
          )}
        </div>
  
        <div>
          <h3  className="font-josefin text-2xl font-bold capitalize bg-gradient-to-r to-orangeDark via-orangeBrown from-deepBrown bg-clip-text text-transparent">{feature}</h3>
        </div>
        <div>
          <p className="text-xl md:text-2xl text-navyDark transition-colors duration-500 hover:text-navyMedium">{description}</p>
        </div>
        </div>
      </div>
    );
  };
  
  export default FeatureCard;