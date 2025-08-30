'use client';
import React from 'react';
import Image from 'next/image';
import '../../styles/global.scss';
import { AnimatePresence } from 'framer-motion';

const bestSellingImages = [
  '/staticAssets/images/bestSelling_img-1.svg',
  '/staticAssets/images/bestSelling_img-2.svg',
  '/staticAssets/images/bestSelling_img-3.svg',
  '/staticAssets/images/bestSelling_img-4.svg',
  '/staticAssets/images/bestSelling_img-5.svg',
  '/staticAssets/images/bestSelling_img-1.svg',
  '/staticAssets/images/bestSelling_img-2.svg',
  '/staticAssets/images/bestSelling_img-3.svg',
  '/staticAssets/images/bestSelling_img-4.svg',
  '/staticAssets/images/bestSelling_img-5.svg',
];

const BestSellingScroller = () => {
  return (
    <div className="border-b-2 border-grayLight bg-grayDark p-16 lg:p-24">
      <div className="mb-5 pb-2">
        <h2 className="bg-gradient-to-r from-orangeMain via-grayLight to-white bg-clip-text font-josefin text-4xl font-bold capitalize text-transparent sm:text-5xl lg:text-6xl">
          Best selling items
        </h2>
      </div>
      <div className="relative">
        <div className="hide-scrollbar overflow-x-auto">
          <div className="flex snap-x snap-mandatory flex-nowrap gap-4 p-2">
            <AnimatePresence mode="popLayout">
              {bestSellingImages.map((img, index) => (
                <div
                  key={index}
                  className="relative w-[46%] flex-shrink-0 snap-start xs:w-[40%] sm:w-[35%] md:w-[25%] lg:w-[18%]"
                >
                  <Image
                    src={img}
                    alt={`Best selling item ${index + 1}`}
                    width={200}
                    height={200}
                    className="h-auto w-full rounded-lg"
                  />
                </div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellingScroller;
