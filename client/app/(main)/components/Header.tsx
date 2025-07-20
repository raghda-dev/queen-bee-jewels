//client/app/(main)/components/Header.tsx

'use client';

import React from 'react';
import '../../styles/global.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, Settings, LogOut } from 'lucide-react';
import axiosInstance from '../lib/axios/axios';
import Link from 'next/link';

const Header = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
      router.push('/?mode=login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <header className="__header min-w-[70vw] md:max-w-[100vw]">
      <div className="relative box-border flex h-80 w-full flex-col justify-normal bg-navyDark px-3 py-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="relative z-50 cursor-pointer">
            <Image
              src="/staticAssets/images/logo.svg"
              alt="Logo"
              width={100}
              height={70}
            />
          </Link>

          <Image
            src="/staticAssets/images/avatar.svg"
            height={50}
            width={70}
            alt="avatar"
            className="w-24 rounded-full object-cover"
          />
        </div>

        {/* search input centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-10 w-full max-w-[25rem] sm:max-w-[35rem] md:max-w-[55rem]">
            <input
              type="text"
              className="placeholder-grayLight/60 focus:ring-grayLight/30 smooth text-md mt-4 w-full rounded-full bg-grayLight py-1 text-black opacity-55 outline-none transition-all focus:bg-white focus:ring-2 md:px-5 md:py-2 md:text-lg lg:text-2xl"
              placeholder="Search..."
            />
            <Search
              className="absolute right-3 min-h-9 w-9 -translate-y-10 text-white sm:w-16 md:min-h-11 md:-translate-y-11 lg:w-20 xl:-translate-y-11 xl:translate-x-5"
              size={25}
            />
          </div>
        </div>
      </div>

      {/* Bottom Section - Buttons on the Right */}
      <div className="box-border flex h-14 w-full items-center justify-end border-b-2 border-grayLight bg-grayMedium pr-6">
        <button
          className="border-2 p-2 text-black transition hover:bg-grayLight"
          onClick={() => router.push('/home/cart', { scroll: false })}
        >
          <ShoppingCart size={24} className="w-7 sm:w-9 md:w-11" />
        </button>
        <button
          className="border-2 p-2 text-black transition hover:bg-grayLight"
          onClick={() => router.push('/home/wishlist', { scroll: false })}
        >
          {/* <HeartIcon className='w-12 h-9 font-bold'/> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-9 w-10 text-black"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
       2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 
       14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
       6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </button>
        <button
          className="border-r-2 p-2 text-black transition hover:bg-grayLight"
          onClick={() => router.push('/home/settings/', { scroll: false })}
        >
          <Settings size={24} className="w-7 sm:w-9 md:w-11" />
        </button>
        <button
          className="border-r-2 p-2 text-black transition hover:bg-grayLight"
          onClick={handleLogout}
        >
          <LogOut size={24} className="w-7 font-extrabold sm:w-9 md:w-11" />
        </button>
      </div>
    </header>
  );
};

export default Header;
