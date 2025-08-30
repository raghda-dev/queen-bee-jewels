// client/app/(main)/components/Header.tsx

'use client';

import React from 'react';
import '../../styles/global.scss';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Search, ShoppingCart, Settings, LogOut } from 'lucide-react';
import axiosInstance from '../lib/axios/axios';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '../lib/redux/hooks';
import { setSearchQueryForPage } from "../lib/redux/sidebar/sidebarSlice";
import { logout as logoutAction } from "../lib/redux/user/userSlice";

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const segments = pathname?.split('/').filter(Boolean) ?? [];
  const pageKey = segments[1] ?? 'home';

  const handleLogout = async () => {
    try {
      // call backend to clear server session/cookies
      await axiosInstance.post('/auth/logout');

      // clear any client-only tokens / guest storage you keep
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('rememberedEmail');
        // (optional) clear guest-specific storage that shouldn't persist across sessions
        // localStorage.removeItem('guestCart');
        // localStorage.removeItem('guestWishlist');
      } catch (e) {
        // ignore localStorage errors
        // eslint-disable-next-line no-console
        console.warn('localStorage cleanup failed', e);
      }

      // clear user slice (keeps reducer logic simple)
      dispatch(logoutAction());

      // Force a full page navigation (replace history so back doesn't return to logged-in state)
      // This avoids partial client rehydration that causes layout glitches.
      // We use replace() so the back button won't go back into the logged-in session.
      window.location.replace('/?mode=login');
    } catch (err) {
      // if logout call fails, still try to reset client state and do a hard reload
      // eslint-disable-next-line no-console
      console.error('Logout failed (backend). Falling back to client-side reset.', err);

      try {
        localStorage.removeItem('token');
        localStorage.removeItem('rememberedEmail');
      } catch (e) {
        // ignore
      }

      dispatch(logoutAction());
      window.location.replace('/?mode=login');
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQueryForPage({ page: pageKey, query: e.target.value }));
  };

  return (
    <header className="__header min-w-[70vw] md:max-w-[100vw]">
      <div className="relative box-border flex h-80 w-full flex-col justify-normal bg-navyDark px-6 py-6">
        <div className="flex items-center justify-between">
          <Link href="/home" className="relative z-50 cursor-pointer">
            <Image
              src="/staticAssets/images/logo.svg"
              alt="Logo"
              width={70}
              height={50}
              className="md:w-32 lg:w-36 xl:w-40"
            />
          </Link>

          <div className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] overflow-hidden rounded-full border border-white">
            <Image
              src={user?.avatar || '/staticAssets/images/fallback.png'}
              alt="User Avatar"
              width={60}
              height={60}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* search input centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-10 w-full max-w-[25rem] sm:max-w-[35rem] md:max-w-[55rem]">
            <input
              type="text"
              onChange={handleSearch}
              className="placeholder-grayLight/60 focus:ring-grayLight/30 smooth text-md mt-4 w-full rounded-full bg-grayLight py-1 text-black opacity-55 outline-none transition-all focus:bg-white focus:ring-2 md:px-5 md:py-2 md:text-lg lg:text-2xl"
              placeholder="Search..."
            />
            <Search
              className="absolute right-1 max-h-8 w-9 -translate-y-8 text-white sm:w-16 md:min-h-11 md:-translate-y-11 lg:w-24 xl:-translate-y-11 xl:translate-x-5"
              size={25}
            />
          </div>
        </div>
      </div>

      {/* Bottom Section - Buttons on the Right */}
      <div className="box-border px-5 flex h-14 w-full items-center justify-end border-b-2 border-grayLight bg-grayMedium">
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-[2.4rem] w-7 sm:w-8 md:h-9 md:w-10 text-black"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 
              2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 
              4.5 2.09C13.09 3.81 14.76 3 16.5 3 
              19.58 3 22 5.42 22 8.5c0 3.78-3.4 
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
