'use client';
import React from 'react';
import Image from 'next/image';
import '../styles/global.scss';
// import Button from './Button';
// import HeartIcon from '../public/staticAssets/icons/HeartIcon.svg'; 
// import EmptyHeartIcon from '../public/staticAssets/icons/EmptyHeart.svg'; 

const images = [
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
  // const [liked, setLiked] = useState<boolean[]>([]); // Start with an empty array
  // useEffect(() => {
  //   setLiked(Array(images.length).fill(false)); // Initialize liked state after hydration
  // }, []); // This will run only on the client-side

  // const toggleLike = (index: number) => {
  //   setLiked((prev) =>
  //     prev.map((like, i) => (i === index ? !like : like))
  //   );
  // };

          // from-orangeMain via-grayLight to-white

  return (
    <div className="border-b-2 border-grayLight bg-grayDark p-16 lg:p-24">
      <div className="mb-5 pb-2">
        <h2 className="bg-gradient-to-r 
         from-orangeMain via-grayLight to-white
         bg-clip-text font-josefin text-4xl 
         font-bold capitalize text-transparent sm:text-5xl lg:text-6xl">
          Best selling items
        </h2>
      </div>

      <div className="relative">
        <div className="hide-scrollbar overflow-x-auto">
          <div className="flex snap-x snap-mandatory flex-nowrap gap-4 p-2">
            {images.map((img, index) => {
              if (!img) return null;

              return (
                <div
                  key={index}
                  className="relative w-[50%] flex-shrink-0 snap-start sm:w-[40%] md:w-[30%] lg:w-[20%] xl:w-[15%]"
                >
                  <Image
                    alt={`Best selling item ${index + 1}`}
                    src={img}
                    width={200}
                    height={200}
                    className="h-auto w-full rounded-lg"
                  />
                  {/* <Button
                    color="transparent"
                    variant="textButton"
                    onClick={() => toggleLike(index)}
                    className="absolute right-2 top-2 z-10 p-0"
                  > */}
                    {/* <Image
                      src={liked[index] ? HeartIcon : EmptyHeartIcon}
                      alt={liked[index] ? 'heart icon' : 'empty heart icon'}
                      className="heart-icon"
                      width={24}
                      height={24}
                    /> */}
                  {/* </Button> */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellingScroller;
