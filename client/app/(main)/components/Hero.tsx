//client/app/(main)/components/Hero.tsx

'use client';

import React from 'react';
import '../../styles/global.scss';
import '../../styles/tailwind.css';
import { Mail, Phone, Globe } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Button from './Button';
import btnStyles from '../../styles/sass/modules/button.module.scss';
import { useAppSelector } from '../lib/redux/hooks';
import useHydrated from '../hooks/useHydrated';

const Hero = () => {
  const user = useAppSelector((state) => state.user.user);
  
  const hydrated = useHydrated();
  const isClientLoggedIn = hydrated && Boolean(user);

    if (!hydrated) return null;


  const handleScrollerToSignUpIn = (mode: 'signup' | 'login') => {
    const section = document.getElementById('signupin');
    if (section) {
      window.history.pushState(null, ' ', `#signupin?mode=${mode}`);
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoginClick = () => {
    if (user) {
      window.location.href = '/home';
    } else {
      const section = document.getElementById('signupin');
      if (section) {
        window.history.pushState(null, ' ', `#signupin?mode=login`);
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="__hero flex h-[70vh] flex-col w-full py-3 px-4 md:px-3 overflow-visible">
      {/* Top Navigation  */}
      <nav className="__hero nav top__nav flex w-full items-center justify-between">
        <Link href="/" id="logo">
          <Image
            alt="Logo"
            src="/staticAssets/images/logo.svg"
            width={100}
            height={50}
            className="h-16 w-32 transition-all md:h-20 lg:h-24 lg:w-44"
          />
        </Link>
        <div className="flex gap-1 sm:gap-1 md:gap-2">
          <Button
            onClick={() => handleScrollerToSignUpIn('signup')}
            rightIcon={<span className={`${btnStyles['arrow-down']}`}>↓</span>}
            shape="square"
          >
            register
          </Button>
          <Button
            onClick={handleLoginClick}
            variant="gradient"
            rightIcon={
              <span className={`${btnStyles[isClientLoggedIn ? 'arrow-right' : 'arrow-down']}`}>
                {user ? '→' : '↓'}
              </span>
            }
            shape="square"
          >
            login
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-grow flex-col items-center justify-center overflow-visible text-center">
        <h2 className={`queen__bee__jewels text-center font-bold`}>
          <span>
            Queen
            <Image
              alt="Bee"
              src="/staticAssets/images/Bee.svg"
              className={`mr-2 inline h-auto w-[4rem] -translate-y-3 transition-all duration-300 ease-in-out sm:w-[5rem] md:w-[6rem] lg:w-[6.5rem]`}
              width={50}
              height={50}
            />
            Jewels
          </span>
        </h2>
        <h1 className="elegancy z-100 mb-2 mt-2 w-full border-solid text-center text-2xl font-medium xl:font-semibold">
          <span>Let pieces you choose talk about your elegancy</span>
        </h1>
      </div>

      {/* Bottom Navigation */}
      <nav className="nav bottom__nav flex w-full items-center justify-between">
        {/* Left Side: Contact Icons  */}
        <ul className="nav bottom__nav contact__btns flex">
          <li className="icon_wrapper">
            <Mail size={20} />
          </li>
          <li className="icon_wrapper">
            <Phone size={20} />
          </li>
          <li className="icon_wrapper icon--instagram">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="instagramGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" style={{ stopColor: '#feda75', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: '#d62976', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#4f5bd5', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <path
                d="M16 3H8C5.2 3 3 5.2 3 8V16C3 18.8 5.2 21 8 21H16C18.8 21 21 18.8 21 16V8C21 5.2 18.8 3 16 3ZM19 16C19 17.7 17.7 19 16 19H8C6.3 19 5 17.7 5 16V8C5 6.3 6.3 5 8 5H16C17.7 5 19 6.3 19 8V16ZM12 7C9.8 7 8 8.8 8 11C8 13.2 9.8 15 12 15C14.2 15 16 13.2 16 11C16 8.8 14.2 7 12 7ZM12 13C10.9 13 10 12.1 10 11C10 9.9 10.9 9 12 9C13.1 9 14 9.9 14 11C14 12.1 13.1 13 12 13ZM17.5 6.5C17.2 6.5 17 6.3 17 6C17 5.7 17.2 5.5 17.5 5.5C17.8 5.5 18 5.7 18 6C18 6.3 17.8 6.5 17.5 6.5Z"
                fill="url(#instagramGradient)"
              />
            </svg>
          </li>
          <li className="icon_wrapper icon--facebook">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="blue"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 8H7V11H9V21H12V11H14.8L15 8H12V7C12 6.5 12.5 6 13 6H15V3H12C10 3 9 4.5 9 6V8Z" />
            </svg>
          </li>
        </ul>

        {/* Right Side: Language Switcher */}
        <ul className="nav bottom__nav lang__btns flex items-center">
          <li className="botton__nav__btns--lang text-1xl icon_wrapper font-semibold">
            En
          </li>
          <li className="bottom__nav__btns--icon icon_wrapper">
            <Globe size={20} />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Hero;
