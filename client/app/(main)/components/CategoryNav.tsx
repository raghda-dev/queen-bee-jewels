"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";


const categories = [
  { name: "Silver", path: "/home/silver" },
  { name: "Bridal", path: "/home/bridal" },
  { name: "Watches", path: "/home/watches" },
  { name: "Classic", path: "/home/classic" },
];

const CategoryNav = () => {
  const pathname = usePathname(); // Get the current URL path

  return (
    <nav className="flex border-b border-grayLight m-14 md:m-20 xl:m-28">
      {categories.map((category) => {
        const isActive = pathname === category.path;

        return (
          <Link
            key={category.path}
            href={category.path}
            className={`px-5 py-3 flex items-center text-md sm:text-lg md:text-xl lg:text-3xl
              rounded-r-sm capitalize font-normal transition-all hover:transition-all hover:duration-150 hover:ease-linear border-l 
              border-r border-t border-grayLight hover:bg-purpleLight hover:text-white ${
              isActive ? "bg-purpleLight border-none text-white duration-300 ease-in-out" : ""
            }`}
          >
            {category.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default CategoryNav;
