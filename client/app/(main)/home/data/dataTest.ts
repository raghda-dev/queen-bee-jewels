// client/app/home/data/products.ts

import { StaticImageData } from 'next/image';
import homePhoto1 from '../../../../public/staticAssets/images/homePhoto1.svg';
import homePhoto2 from '../../../../public/staticAssets/images/homePhoto2.svg';
import homePhoto3 from '../../../../public/staticAssets/images/homePhoto3.svg';
import homePhoto4 from '../../../../public/staticAssets/images/homePhoto4.svg';
import homePhoto5 from '../../../../public/staticAssets/images/homePhoto5.svg';
import homePhoto6 from '../../../../public/staticAssets/images/homePhoto6.svg';
import homePhoto7 from '../../../../public/staticAssets/images/homePhoto7.svg';
import homePhoto8 from '../../../../public/staticAssets/images/homePhoto8.svg';
import homePhoto9 from '../../../../public/staticAssets/images/homePhoto9.svg';
import homePhoto10 from '../../../../public/staticAssets/images/homePhoto10.svg';
import homePhoto11 from '../../../../public/staticAssets/images/homePhoto11.svg';
import homePhoto12 from '../../../../public/staticAssets/images/homePhoto12.svg';
import homePhoto13 from '../../../../public/staticAssets/images/homePhoto13.svg';
import homePhoto14 from '../../../../public/staticAssets/images/homePhoto14.svg';
import homePhoto15 from '../../../../public/staticAssets/images/homePhoto15.svg';
import homePhoto16 from '../../../../public/staticAssets/images/homePhoto16.svg';

export type ShopifyProduct = {
  id: number;
  handle: string;
  title: string;
  vendor: string;
  productType: string;
  tags: string[];
  description: string;
  images: StaticImageData[];
  variants: {
    id: number;
    title: string;
    price: string;
    size: 'small' | 'medium' | 'large';
    material?: string;
    color?: string;
  }[];
};

export const products: ShopifyProduct[] = [
  {
    id: 1,
    handle: 'silver-earrings',
    title: 'Silver Earrings',
    vendor: 'QueenBee',
    productType: 'Earrings',
    tags: ['silver', 'classic', 'bridal'],
    description: 'Silver earrings closed like a ring with crystals on the top.',
    images: [homePhoto1, homePhoto2, homePhoto3],
    variants: [
      {
        id: 11,
        title: 'Default Variant',
        price: '$20',
        size: 'small',
        material: 'Sterling Silver',
        color: 'Silver',
      },
    ],
  },
  {
    id: 2,
    handle: 'gold-bracelet',
    title: 'Gold Bracelet',
    vendor: 'QueenBee',
    productType: 'Bracelet',
    tags: ['silver', 'classic', 'bridal'],
    description: 'Elegant gold bracelet with a delicate design.',
    images: [homePhoto2],
    variants: [
      {
        id: 21,
        title: 'Default Variant',
        price: '$50',
        size: 'small',
      },
    ],
  },
  {
    id: 3,
    handle: 'diamond-ring',
    title: 'Diamond Ring',
    vendor: 'QueenBee',
    productType: 'Ring',
    tags: ['silver', 'classic', 'bridal'],
    description: 'A beautiful diamond ring perfect for special occasions.',
    images: [homePhoto3],
    variants: [
      {
        id: 31,
        title: 'Default Variant',
        price: '$200',
        size: 'small',
      },
    ],
  },
  {
    id: 4,
    handle: 'silver-earrings-2',
    title: 'Silver Earrings',
    vendor: 'QueenBee',
    productType: 'Earrings',
    tags: ['silver', 'classic', 'bridal'],
    description: 'Silver earrings closed like a ring with crystals on the top.',
    images: [homePhoto4],
    variants: [
      {
        id: 41,
        title: 'Default Variant',
        price: '$20',
        size: 'small',
      },
    ],
  },
  {
    id: 5,
    handle: 'gold-bracelet-2',
    title: 'Gold Bracelet',
    vendor: 'QueenBee',
    productType: 'Bracelet',
    tags: ['silver', 'classic', 'bridal'],
    description: 'Elegant gold bracelet with a delicate design.',
    images: [homePhoto5],
    variants: [
      {
        id: 51,
        title: 'Default Variant',
        price: '$50',
        size: 'small',
      },
    ],
  },
  {
    id: 6,
    handle: 'diamond-ring-2',
    title: 'Diamond Ring',
    vendor: 'QueenBee',
    productType: 'Ring',
    tags: ['silver', 'classic', 'bridal'],
    description: 'A beautiful diamond ring perfect for special occasions.',
    images: [homePhoto6],
    variants: [
      {
        id: 61,
        title: 'Default Variant',
        price: '$200',
        size: 'small',
      },
    ],
  },
  {
    id: 7,
    handle: 'silver-watch',
    title: 'Silver Watch',
    vendor: 'QueenBee',
    productType: 'Watch',
    tags: ['silver', 'classic', 'bridal'],
    description: 'Silver feminine hand watch.',
    images: [homePhoto7],
    variants: [
      {
        id: 71,
        title: 'Default Variant',
        price: '$20',
        size: 'small',
      },
    ],
  },
  {
    id: 8,
    handle: 'gold-bracelet-3',
    title: 'Gold Bracelet',
    vendor: 'QueenBee',
    productType: 'Bracelet',
    tags: ['silver', 'classic', 'bridal'],
    description: 'Elegant gold bracelet with a delicate design.',
    images: [homePhoto8],
    variants: [
      {
        id: 81,
        title: 'Default Variant',
        price: '$50',
        size: 'small',
      },
    ],
  },
  {
    id: 9,
    handle: 'classic-watch',
    title: 'Classic Watch',
    vendor: 'QueenBee',
    productType: 'Watch',
    tags: ['silver', 'classic', 'bridal'],
    description: 'Classic silver watch with diamond details.',
    images: [homePhoto9],
    variants: [
      {
        id: 91,
        title: 'Default Variant',
        price: '$200',
        size: 'small',
      },
    ],
  },
  {
    id: 10,
    handle: 'silver-earrings-3',
    title: 'Silver Earrings',
    vendor: 'QueenBee',
    productType: 'Earrings',
    tags: ['silver', 'classic', 'bridal'],
    description: 'Silver earrings closed like a ring with crystals on the top.',
    images: [homePhoto10],
    variants: [
      {
        id: 101,
        title: 'Default Variant',
        price: '$20',
        size: 'small',
      },
    ],
  },
  {
    id: 11,
    handle: 'gold-bracelet-4',
    title: 'Gold Bracelet',
    vendor: 'QueenBee',
    productType: 'Bracelet',
    tags: ['silver', 'classic', 'bridal'],
    description: 'Elegant gold bracelet with a delicate design.',
    images: [homePhoto11],
    variants: [
      {
        id: 111,
        title: 'Default Variant',
        price: '$50',
        size: 'small',
      },
    ],
  },
  {
    id: 12,
    handle: 'diamond-ring-3',
    title: 'Diamond Ring',
    vendor: 'QueenBee',
    productType: 'Ring',
    tags: ['silver', 'classic', 'bridal'],
    description: 'A beautiful diamond ring perfect for special occasions.',
    images: [homePhoto12],
    variants: [
      {
        id: 121,
        title: 'Default Variant',
        price: '$200',
        size: 'small',
      },
    ],
  },
  {
    id: 13,
    handle: 'silver-earrings-4',
    title: 'Silver Earrings',
    vendor: 'QueenBee',
    productType: 'Earrings',
    tags: ['watches'],
    description: 'Silver earrings closed like a ring with crystals on the top.',
    images: [homePhoto13],
    variants: [
      {
        id: 131,
        title: 'Default Variant',
        price: '$20',
        size: 'small',
      },
    ],
  },
  {
    id: 14,
    handle: 'gold-bracelet-5',
    title: 'Gold Bracelet',
    vendor: 'QueenBee',
    productType: 'Bracelet',
    tags: ['watches'],
    description: 'Elegant gold bracelet with a delicate design.',
    images: [homePhoto14],
    variants: [
      {
        id: 141,
        title: 'Default Variant',
        price: '$50',
        size: 'small',
      },
    ],
  },
  {
    id: 15,
    handle: 'diamond-ring-4',
    title: 'Diamond Ring',
    vendor: 'QueenBee',
    productType: 'Ring',
    tags: ['watches'],
    description: 'A beautiful diamond ring perfect for special occasions.',
    images: [homePhoto15],
    variants: [
      {
        id: 151,
        title: 'Default Variant',
        price: '$200',
        size: 'small',
      },
    ],
  },
  {
    id: 16,
    handle: 'diamond-ring-5',
    title: 'Diamond Ring',
    vendor: 'QueenBee',
    productType: 'Ring',
    tags: ['watches'],
    description: 'A beautiful diamond ring perfect for special occasions.',
    images: [homePhoto16],
    variants: [
      {
        id: 161,
        title: 'Default Variant',
        price: '$200',
        size: 'small',
      },
    ],
  },
];
