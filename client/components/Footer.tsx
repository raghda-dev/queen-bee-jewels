import React from "react";
import { FooterProps } from "../types/types";
import Image from "next/image";
import Logo from '../public/staticAssets/images/logo.svg'

const Footer: React.FC<FooterProps>= ({ year }) => {
  return (
    <footer className="__Footer bg-black text-white px-6 py-10 md:px-16 lg:px-20 min-h-[40vh] flex flex-col justify-between">
      <div className="__Footer __Footer__item Footer__item--logo  max-w-7xl mx-auto flex flex-col items-center justify-between gap-y-12 md:gap-y-0">

        {/* logo */}
        <div className="flex items-center space-x-3">
        <Image src={Logo} alt="Logo" width={100} height={70} />
        </div>

        {/* navigation */}
        <nav className="__Footer __Footer__item __Footer__item--list text-center md:text-left sm:text-sm">
          <ul className="__Footer __Footer__item __Footer__item--list flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 text-gray-200">
            <li className="__Footer __Footer__item--list __Footer__item--list--item _insta__face _insta__face__icons">insta face</li>
            <li className="__Footer __Footer__item--list __Footer__item--list--item _phone phone__icon">+970569737826</li>
            <li className="__Footer __Footer__item--list __Footer__item--list--item _email email__icon">QueenPJewels@gmail.com</li>
            <li className="__Footer __Footer__item--list __Footer__item--list--item _location location__icon">
              al irsal st. Ramallah - Palestine
            </li>
          </ul>
        </nav>
      </div>
      <p className="__Footer __Footer__item __Footer__item--copy text-center text-gray-500 text-xl mt-auto">
        &copy; {year} Queen Bee Jewels. All rights reserved.</p>
    </footer>
  );
};

export default Footer;