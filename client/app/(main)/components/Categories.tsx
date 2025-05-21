import React from 'react';
import Card from './Card';
import '../../styles/global.scss';
import Button from './Button';


const Categories = () => {
  return (
    <div className="categories flex w-full cursor-pointer flex-col justify-center gap-6 bg-mutedRed p-6">
      <h1 className="via-mainOrange slide-in-left delay-0.2s mb-9 mt-20 inline-block bg-gradient-to-r from-white to-grayDark bg-clip-text text-center font-josefin text-4xl xs:text-5xl font-bold text-transparent sm:ml-16 sm:text-left md:ml-16 lg:mt-60 lg:text-6xl lg:font-black">
        Check our main categories
      </h1>
      <div className="category_cards mx-auto grid min-h-screen w-full max-w-[130rem] place-items-center px-6 pr-0 gap-y-3 sm:grid-cols-2 sm:gap-y-7 md:grid-cols-2 md:gap-x-4 md:gap-y-6 lg:mt-[-15rem] lg:grid-cols-4 lg:gap-6 xl:grid-cols-4 xl:gap-[10rem]">
        <div className="card-item">
          <Card
            img='/staticAssets/images/category_img-1.svg'
            collectionName="Our Watches collection"
            description="special watch for a complete look."
            showHeart
            primaryButton={
              <Button
                size="medium"
                variant="textButton"
                color="var(--deep-brown)"
                animation='text-underline'
                rightIcon={<span>→</span>}
              >
                See More
              </Button>
            }
          ></Card>
        </div>
        <div className="card-item">
          <Card
            img='/staticAssets/images/category_img-2.svg'
            collectionName="Our Bridal collection"
            description="everything a bride might need."
   
   showHeart         primaryButton={
              <Button
                size="medium"
                variant="textButton"
                color="var(--deep-brown)"
                animation='text-underline'
                rightIcon={<span>→</span>}
              >
                See More
              </Button>
            }
          ></Card>
        </div>
        <div className="card-item">
          <Card
            img='/staticAssets/images/category_img-3.svg'
            collectionName="Our Silver collection"
            description="silver only for silver lovers."
   
   showHeart         primaryButton={
              <Button
                size="medium"
                variant="textButton"
                color="var(--deep-brown)"
                animation='text-underline'
                rightIcon={<span>→</span>}
              >
                See More
              </Button>
            }
          ></Card>
        </div>
        <div className="card-item">
          <Card
            img='/staticAssets/images/category_img-4.svg'
            collectionName="Our Classic collection"
            description="find more in our classic collection."
            showHeart
            primaryButton={
              <Button
                size="medium"
                variant="textButton"
                color="var(--deep-brown)"
                animation='text-underline'
                rightIcon={<span>→</span>}
              >
                See More
              </Button>
            }
          ></Card>
        </div>
      </div>
    </div>
  );
};

export default Categories;
