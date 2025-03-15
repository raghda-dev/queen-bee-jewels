'use client';
import React, { useState } from 'react';
import Image from 'next/image';
const dottedSquares = '/staticAssets/images/dottedSquares.svg';
const columns = '/staticAssets/images/columns.svg';
const downAboveRec = '/staticAssets/images/downAboveRec.svg';

import Signup from './Signup';
import Login from './Login';

const SignUpIn = () => {
  const [isLogin, setIsLogin] = useState(false); // Default to Signup

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-white px-2 sm:px-12 md:px-16 lg:px-24 xl:px-32">
      {/* Top Decoration */}
      <div className="absolute top-0 w-full">
        <Image
          src={downAboveRec}
          alt="box opener"
          width={1520}
          height={100}
          className="w-full"
        />
      </div>

      {/* Background Decorations - Left Side (Appears from md) */}
      <div className="absolute left-0 z-10 flex h-full items-center gap-x-16 md:flex">
        {/* Columns */}
        <Image
          src={columns}
          alt="columns"
          width={150}
          height={1000}
          className="h-full object-contain"
        />
         {/* Columns */}
         <Image
          src={columns}
          alt="columns"
          width={150}
          height={1000}
          className="h-full object-contain"
        />
         {/* Columns */}
         <Image
          src={columns}
          alt="columns"
          width={150}
          height={1000}
          className="h-full object-contain"
        />
        {/* Dotted Squares */}
        <Image
          src={dottedSquares}
          alt="dotted squares"
          width={200}
          height={150}
          className="relative hidden sm:block"
        />
      </div>

      {/* Auth Forms - Positioned to the Right */}
      <div className="relative z-20 ml-auto flex w-full justify-end md:w-1/2 lg:w-1/3">
        <div className="flex min-h-[50vh] w-full items-center">
          {isLogin ? (
            <Login setIsLogin={setIsLogin} />
          ) : (
            <Signup setIsLogin={setIsLogin} />
          )}
        </div>
      </div>
      {/* Bottom Decoration */}
      <div className="absolute bottom-0 w-full">
        <Image
          src={downAboveRec}
          alt="box opener"
          width={1520}
          height={100}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default SignUpIn;
