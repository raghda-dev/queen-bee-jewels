"use client";

import React, { useState } from "react";
import Link from "next/link";
import "../../styles/global.scss";
import { ChevronDown, Users, ShoppingBag, Star, Gift, Percent, Venus, Mars } from "lucide-react";

import Button from "./Button";

const Sidebar = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  return (
    <aside className="__sidebar relative left-0 top-0 h-auto w-20 md:min-w-[20rem] xl:min-w-[25rem] bg-grayMedium p-5 py-20 shadow-lg text-black flex flex-col justify-evenly transition-all duration-300">
      {/* Sidebar Header */}
      <h2 className="ml-4 text-4xl xl:text-6xl font-extrabold font-josefin hidden md:block mb-24">Explore</h2>

      {/* Filter Options */}
      <ul className="space-y-2 mb-24">
        {[
          { name: "all", icon: <Users size={24} className="text-grayDark w-11 sm:w-11" />, href: "/home/" },
          { name: "men", icon: <Mars className="text-grayDark w-11 h-11" />, href: "/home/men" },
          { name: "women", icon: <Venus className="text-grayDark w-11 h-11" />, href: "/home/women" },
        ].map(({ name, icon, href }) => (
          <Link key={name} href={href}>
            <li className="flex items-center md:text-lg lg:text-xl xl:text-2xl cursor-pointer space-x-3 rounded-lg px-4 py-2 text-black font-semibold transition hover:bg-grayLight">
              {icon}
              <span className="capitalize hidden md:block">{name === "all" ? "View All" : `${name} Only`}</span>
            </li>
          </Link>
        ))}
      </ul>

      {/* Price Section */}
      <div className="space-y-16 mb-24">
        <div className="flex items-end lg:items-start justify-between ml-4 mb-9">
          <h3 className="text-3xl lg:text-4xl font-semibold underline font-josefin hidden md:block">Price</h3>
          <ChevronDown size={22} className="text-black hidden md:block" />
        </div>

        {/* Range Slider */}
        <div className="relative hidden md:block">
          <div className="h-1 w-[20rem] xl:w-96 bg-grayDark rounded-2xl"></div>
          <div className="absolute left-0 h-5 w-5 rounded-full bg-black" style={{ transform: "translateY(-6px)" }}></div>
          <div className="absolute left-2/3 h-5 w-5 rounded-full bg-black" style={{ transform: "translateY(-6px)" }}></div>
        </div>

        {/* Min/Max Inputs */}
        <div className="ml-4 items-center space-x-3 hidden md:flex">
          <span className="font-medium text-2xl">$</span>
          <input
            type="number"
            placeholder="Min"
            className="w-14 lg:w-16 rounded-md border bg-white px-2 py-1 text-black outline-none"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
          <span className="font-bold text-lg">&ndash;</span>
          <span className="font-medium text-2xl">$</span>
          <input
            type="number"
            placeholder="Max"
            className="w-14 lg:w-16 rounded-md border bg-white px-2 py-1 text-black outline-none"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
          <Button variant="textButton" size="large" className="px-3 py-1 underline">
            Go
          </Button>
        </div>
      </div>

      {/* Specials Section */}
      <div className="mt-6">
        <div className="flex items-start justify-between ml-4 xl:mb-9">
          <h3 className="text-4xl font-extrabold underline font-josefin hidden md:block">Specials</h3>
          <ChevronDown size={22} className="text-black font-thin hidden md:block" />
        </div>

        <ul className="space-y-5 mb-16">
          {[
            { name: "New In", icon: <Star size={24} className="text-grayDark w-9 sm:w-11" />, href: "/home/new-in" },
            { name: "Brands", icon: <ShoppingBag size={24} className="text-grayDark w-9 sm:w-11" />, href: "/home/brands" },
            { name: "On Sale Items", icon: <Percent size={24} className="text-grayDark w-9 sm:w-11" />, href: "/home/sale" },
            { name: "Gift Boxes", icon: <Gift size={24} className="text-grayDark w-9 sm:w-11" />, href: "/home/gifts" },
          ].map(({ name, icon, href }) => (
            <Link key={name} href={href}>
              <li className="px-4 py-2 text-black font-semibold transition underline cursor-pointer flex items-center space-x-3">
                {icon}
                <span className="hidden md:block md:text-lg lg:text-xl xl:text-2xl">{name}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

