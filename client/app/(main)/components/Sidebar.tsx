// client/app/(main)/components/Sidebar.tsx

'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../../styles/global.scss';
import {
  LayoutGrid,
  ChevronDown,
  ShoppingBag,
  Star,
  Gift,
  Percent,
  Venus,
  Mars,
} from 'lucide-react';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../lib/redux/store';
import {
  setPriceRangeForPage,
  applyPriceRangeForPage,
} from '../lib/redux/sidebar/sidebarSlice';

type SidebarProps = {
  page: string;
};

const Sidebar = ({ page }: SidebarProps) => {
  const dispatch = useDispatch();

  // this page data may be undefined until the page client sets products
  const pageData = useSelector((state: RootState) => state.sidebar.pages[page]);

  // Use page defaults if available
  const reduxPriceRange = useMemo(
    () => pageData?.priceRange ?? pageData?.defaultPriceRange ?? [0, 1000],
    [pageData?.priceRange, pageData?.defaultPriceRange]
  );

  // local slider state so dragging doesn't dispatch every frame
  const [localRange, setLocalRange] = useState<[number, number]>(reduxPriceRange);

  // keep local in sync when redux changes (initial set or reset)
  useEffect(() => {
    setLocalRange(reduxPriceRange);
  }, [reduxPriceRange]);

  const safeValue = (val?: number) => (val === undefined || isNaN(val) ? '' : val);

  const handleSliderChange = (val: number | number[]) => {
    if (Array.isArray(val) && val.length === 2) setLocalRange([val[0], val[1]]);
  };

  const handleApply = () => {
    if (!pageData) return; // no products for page yet
    // update the page priceRange in redux and immediately apply the range
    dispatch(setPriceRangeForPage({ page, range: localRange }));
    dispatch(applyPriceRangeForPage({ page, range: localRange }));
  };

  const disabled = !pageData; // disable inputs if page has no products yet

  return (
    <aside className="__sidebar relative left-0 top-0 flex h-auto w-20 flex-col justify-evenly bg-grayMedium p-5 py-20 text-black shadow-lg transition-all duration-300 md:min-w-[20rem] xl:min-w-[25rem]">
      <h2 className="mb-24 ml-4 hidden font-josefin text-4xl font-extrabold md:block xl:text-6xl">Explore</h2>

      <ul className="mb-24 space-y-2">
        {[
          { name: 'all', icon: <LayoutGrid size={26} color="var(--gray-dark)" />, href: '/home/' },
          { name: 'men', icon: <Mars className="h-11 w-11 text-grayDark" />, href: '/home/men' },
          { name: 'women', icon: <Venus className="h-11 w-11 text-grayDark" />, href: '/home/women' },
        ].map(({ name, icon, href }) => (
          <Link key={href} href={href}>
            <li className="flex cursor-pointer items-center justify-start space-x-3 rounded-lg px-4 py-2 font-semibold text-black transition hover:bg-grayLight md:text-lg lg:text-xl xl:text-2xl">
              {icon}
              <span className="hidden capitalize md:block">{name === 'all' ? 'View All' : `${name} Only`}</span>
            </li>
          </Link>
        ))}
      </ul>

      <div className="mb-24 space-y-16">
        <div className="mb-9 ml-4 flex items-end justify-between lg:items-start">
          <h3 className="hidden font-josefin text-3xl font-semibold underline md:block lg:text-4xl">Price</h3>
          <ChevronDown size={22} className="hidden text-black md:block" />
        </div>

        <div className="hidden px-4 md:block">
          <Slider
            range
            min={reduxPriceRange[0]}
            max={reduxPriceRange[1]}
            value={localRange}
            onChange={handleSliderChange}
            disabled={disabled}
            trackStyle={[{ backgroundColor: 'black', height: 6 }]}
            railStyle={{ backgroundColor: '#4B5563', height: 6 }}
            handleStyle={[
              { backgroundColor: 'white', border: '2px solid black', width: 16, height: 16, marginTop: -5 },
              { backgroundColor: 'white', border: '2px solid black', width: 16, height: 16, marginTop: -5 },
            ]}
          />
        </div>

        <div className="ml-4 hidden items-center space-x-3 md:flex">
          <span className="text-2xl font-medium">$</span>
          <input
            type="number"
            placeholder="Min"
            className="w-14 rounded-md border bg-white px-2 py-1 text-black outline-none lg:w-16"
            value={safeValue(localRange[0])}
            min={reduxPriceRange[0]}
            max={localRange[1] - 1}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (!isNaN(val) && val >= reduxPriceRange[0] && val < localRange[1]) setLocalRange([val, localRange[1]]);
            }}
            disabled={disabled}
          />
          <span className="text-lg font-bold">–</span>
          <span className="text-2xl font-medium">$</span>
          <input
            type="number"
            placeholder="Max"
            className="w-14 rounded-md border bg-white px-2 py-1 text-black outline-none lg:w-16"
            value={safeValue(localRange[1])}
            min={localRange[0] + 1}
            max={reduxPriceRange[1]}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (!isNaN(val) && val > localRange[0] && val <= reduxPriceRange[1]) setLocalRange([localRange[0], val]);
            }}
            disabled={disabled}
          />
          <Button variant="textButton" size="large" className="px-3 py-1" animation="text-underline" onClick={handleApply} disabled={disabled}>
            Go
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <div className="ml-4 flex items-start justify-between xl:mb-9">
          <h3 className="hidden font-josefin text-4xl font-extrabold underline md:block">Specials</h3>
          <ChevronDown size={22} className="hidden font-thin text-black md:block" />
        </div>

        <ul className="mb-16 space-y-5">
          {[
            { name: 'New In', icon: <Star size={24} className="w-9 text-grayDark sm:w-11" />, href: '/home/new-in' },
            { name: 'Brands', icon: <ShoppingBag size={24} className="w-9 text-grayDark sm:w-11" />, href: '/home/brands' },
            { name: 'On Sale Items', icon: <Percent size={24} className="w-9 text-grayDark sm:w-11" />, href: '/home/sale' },
            { name: 'Gift Boxes', icon: <Gift size={24} className="w-9 text-grayDark sm:w-11" />, href: '/home/gifts' },
          ].map(({ name, icon, href }) => (
            <Link key={href} href={href}>
              <li className="flex cursor-pointer items-center space-x-3 px-4 py-2 font-semibold text-black underline transition">
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
