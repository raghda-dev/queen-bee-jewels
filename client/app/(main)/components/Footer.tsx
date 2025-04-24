import React from 'react';
import { FooterProps } from '../types/types';
import Image from 'next/image';
// import Logo from '../../public/staticAssets/images/logo.svg';
import { Mail, Phone, Locate } from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC<FooterProps> = ({ year }) => {
  return (
    <footer className="__Footer flex min-h-[55vh] flex-col justify-between bg-black px-6 py-10 text-white md:px-16 lg:px-20">
      <div className="__Footer __Footer__item Footer__item--logo mx-auto flex max-w-7xl flex-col items-center justify-between gap-y-12 md:gap-y-0">
        {/* Logo */}
        <div className="my-7 flex items-center space-x-3">
          <Link href="/">
            <Image src='/staticAssets/images/logo.svg' alt="Logo" width={100} height={70} className='w-32 sm:w-40' />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="text-center">
          <ul className="flex flex-col items-center gap-y-10">
                        {/* Contact Info */}
                        <div className="flex flex-col items-center gap-7 md:flex-row">
              <li className="flex cursor-pointer gap-2 text-md sm:text-xl transition-all duration-300 ease-in hover:text-pinkish">
                <Phone size={17} />
                <span>+970569737826</span>
              </li>
              <li className="flex cursor-pointer gap-2 text-md sm:text-xl transition-all duration-300 ease-in hover:text-pinkish">
                <Mail size={17} />
                QueenPJewels@gmail.com
              </li>
              <li className="flex cursor-pointer gap-2 text-md sm:text-xl transition-all duration-300 ease-in hover:text-pinkish">
                <Locate size={17} />
                al irsal st. Ramallah - Palestine
              </li>
            </div>
            {/* Social Icons */}
            <div className="flex justify-center pt-6">
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
                      <stop
                        offset="0%"
                        style={{ stopColor: '#feda75', stopOpacity: 1 }}
                      />
                      <stop
                        offset="50%"
                        style={{ stopColor: '#d62976', stopOpacity: 1 }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: '#4f5bd5', stopOpacity: 1 }}
                      />
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
            </div>
          </ul>
        </nav>
      </div>

      {/* Copyright */}
      <p className="__Footer __Footer__item __Footer__item--copy mt-auto text-center text-md sm:text-xl text-gray-500">
        &copy; {year} Queen Bee Jewels. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
