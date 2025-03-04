import React from "react";
import FeatureCard from "./FeatureCard";
import squaresIcon from '../public/staticAssets/icons/squares-icon_.svg';
import featureHeartIcon from '../public/staticAssets/icons/feature-heart_.svg';
import lockIcon from '../public/staticAssets/icons/lock-icon_.svg';
import giftBoxIcon from '../public/staticAssets/icons/gift-box_.svg';

const Features = () => {
    return (
        <div className="bg-grayLight grid grid-cols-1 place-items-center sm:gap-28 sm:grid-cols-2 md:grid-cols-4 md:gap-10 p-36 md:px-5 h-auto w-[100vw]">
          <div>
            <FeatureCard icon={squaresIcon} feature="one platform." description="one platform for all accessories that you might need."></FeatureCard>
          </div>
          <div>
            <FeatureCard icon={lockIcon} feature="secure payments." description="secure payments while purchasing"></FeatureCard>
          </div>
          <div>
            <FeatureCard icon={giftBoxIcon} feature="gift boxes." description="pick a special gift in a special gift box for you or for who you love."></FeatureCard>
          </div>
          <div>
            <FeatureCard icon={featureHeartIcon} feature="special products." description="we promise that you will fall in love with our pieces."></FeatureCard>
          </div>
        </div>
    )
}

export default Features;