// client/app/(main)/components/Features.tsx

import React from "react";
import FeatureCard from "./FeatureCard";


const Features = () => {
    return (
        <div className="bg-grayLight grid grid-cols-1 place-items-center sm:gap-28 sm:grid-cols-2 md:grid-cols-4 md:gap-10 p-36 md:px-5 h-auto min-h-[90vh] w-[100vw]">
          <div>
            <FeatureCard icon='/staticAssets/icons/squares-icon_.svg' feature="one platform." description="one platform for all accessories that you might need."></FeatureCard>
          </div>
          <div>
            <FeatureCard icon='/staticAssets/icons/lock-icon_.svg' feature="secure payments." description="secure payments while purchasing"></FeatureCard>
          </div>
          <div>
            <FeatureCard icon='/staticAssets/icons/gift-box_.svg' feature="gift boxes." description="pick a special gift in a special gift box for you or for who you love."></FeatureCard>
          </div>
          <div>
            <FeatureCard icon='/staticAssets/icons/feature-heart_.svg' feature="special products." description="we promise that you will fall in love with our pieces."></FeatureCard>
          </div>
        </div>
    )
}

export default Features;