'use client';

import React from 'react';
import '../../styles/global.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, Settings, LogOut } from 'lucide-react';

const Header = () => {
  const router = useRouter();

  return (
    <header className="__header min-w-[70vw] md:max-w-[100vw]">
      <div className="bg-navyDark relative flex w-full box-border h-80 flex-col justify-normal px-3 py-5">
        <div className="flex items-center justify-between">
          <Image
            src="/staticAssets/images/logo.svg"
            alt="Logo"
            width={100}
            height={70}
            className="w-[7.7rem] md:w-[9rem] lg:w-[10rem] cursor-pointer"
            onClick={() => router.push('/')}
          />
          <Image
            src="/staticAssets/images/avatar.svg"
            height={50}
            width={70}
            alt="avatar"
            className="rounded-full object-cover w-24"
          />
        </div>

        {/* search input centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-[25rem] sm:max-w-[35rem] h-10 md:max-w-[55rem]">
            <input
              type="text"
              className="placeholder-grayLight/60 focus:ring-grayLight/30 smooth mt-4 w-full rounded-full bg-grayLight md:px-5 py-1 md:py-2 text-md md:text-lg lg:text-2xl text-black opacity-55 outline-none focus:bg-white focus:ring-2 transition-all"
              placeholder="Search..."
            />
            <Search
              className="absolute right-3 -translate-y-10 md:-translate-y-11 text-white w-9 sm:w-16 lg:w-20 min-h-9 md:min-h-11 xl:-translate-y-11 xl:translate-x-5"
              size={25}
            />
          </div>
        </div>
      </div>

      {/* Bottom Section - Buttons on the Right */}
      <div className="bg-grayMedium w-full box-border border-b-2 border-grayLight flex items-center justify-end pr-6 h-14">
        <button
          className="border-2 p-2 text-black hover:bg-grayLight transition"
          onClick={() => router.push('/home/cart', { scroll: false })}
        >
          <ShoppingCart size={24} className="w-7 sm:w-9 md:w-11" />
        </button>
        <button
          className="p-2 border-r-2 text-black hover:bg-grayLight transition"
          onClick={() => router.push('/home/settings/', { scroll: false })}
        >
          <Settings size={24} className="w-7 sm:w-9 md:w-11" />
        </button>
        <button
          className="p-2 border-r-2 text-black hover:bg-grayLight transition"
          onClick={() => router.push('/')}
        >
          <LogOut size={24} className="w-7 sm:w-9 md:w-11" />
        </button>
      </div>
    </header>
  );
};

export default Header;
