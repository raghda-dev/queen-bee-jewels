import React from 'react';
import '../styles/global.scss';
import Image from 'next/image';
import watchImg from '../public/staticAssets/images/watch-image.svg';
import Button from './Button';
import Lines from '../public/staticAssets/images/lines.svg';
import smallBoxes from '../public/staticAssets/images/smallBoxes.svg';

const OnePiece = () => {
  return (
    <div className="__one__piece flex flex-col-reverse md:flex-row p-9 bg-grayDark h-[65vh] sm:h-[70vh] md:h-[55vh] lg:h-[60vh]">
      <div className="one__piece one__piece__text flex h-[21vh] md:h-[30vh] md:w-[75vw] md:text-center md:mt-24 flex-col items-center justify-between text-white ml-7">
        <h2 className="one_special_piece via-deepOrange bg-gradient-to-r from-deepPurpleRed to-grayMedium bg-clip-text font-josefin text-5xl md:text-6xl capitalize text-transparent font-bold">
          one special piece.
        </h2>
        <p className="find_piece text-xl xs:text-2xl text-center lg:text-3xl font-semibold">
          you will difinitly find some special piece that looks like you.
        </p>
        <Button
          size="large"
          variant="textButton"
          color="var(--pinkish)"
          hoverTextColor="green"
          animation='text-underline'
          rightIcon={<span>→</span>}
        >
          go find out
        </Button>
      </div>

<div className="one__piece one__piece__img">
  {/* 📷 Main Image */}
  <Image
    src={Lines}
    // height={250}
    // width={300}
    alt="a crooked line"
    className="h-[50vh] w-[40vw] hidden md:block"
  />
</div>

<div className="one__piece one__piece__img">
  {/* 📷 Main Image */}
  <Image
    src={smallBoxes}
    height={70}
    width={70}
    alt="two small boxes"
    className='m-2 hidden md:block md:mt-40 md:mr-32'
  />
</div>
<div className="one__piece one__piece__img ml-5 mr-5 md:mt-10">
  {/* 📷 Main Image */}
  <Image
    src={watchImg}
    // height={250}
    // width={300}
    alt="a watch image"
    className="rounded-lg border-2 border-grayLight h-[31vh] sm:h-[40vh] w-[100vw] md:w-[55vw] md:h-[45]"  
  />
</div>
</div>
  );
};

export default OnePiece;
