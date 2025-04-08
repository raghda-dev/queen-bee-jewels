import { StaticImageData } from 'next/image';
import homePhoto1 from '../../public/staticAssets/images/homePhoto1.svg';
import homePhoto2 from '../../public/staticAssets/images/homePhoto2.svg';
import homePhoto3 from '../../public/staticAssets/images/homePhoto3.svg';
import homePhoto4 from '../../public/staticAssets/images/homePhoto4.svg';
import homePhoto5 from '../../public/staticAssets/images/homePhoto5.svg';
import homePhoto6 from '../../public/staticAssets/images/homePhoto6.svg';
import homePhoto7 from '../../public/staticAssets/images/homePhoto7.svg';
import homePhoto8 from '../../public/staticAssets/images/homePhoto8.svg';
import homePhoto9 from '../../public/staticAssets/images/homePhoto9.svg';
import homePhoto10 from '../../public/staticAssets/images/homePhoto10.svg';
import homePhoto11 from '../../public/staticAssets/images/homePhoto11.svg';
import homePhoto12 from '../../public/staticAssets/images/homePhoto12.svg';
import homePhoto13 from '../../public/staticAssets/images/homePhoto13.svg';
import homePhoto14 from '../../public/staticAssets/images/homePhoto14.svg';
import homePhoto15 from '../../public/staticAssets/images/homePhoto15.svg';
import homePhoto16 from '../../public/staticAssets/images/homePhoto16.svg';

export type MainCategory = 'silver' | 'bridal' | 'watches' | 'classic';
export type ExtraCategory =
  | 'men'
  | 'women'
  | 'new-in'
  | 'on-sale'
  | 'brands'
  | 'gift-box';

export type Product = {
  id: number;
  img?: StaticImageData;
  collectionName: string;
  types: (MainCategory | ExtraCategory)[];
  price: string;
  description: string;
  size: 'small' | 'medium' | 'large';
};

export const products: Product[] = [
  {
    id: 1,
    img: homePhoto1,
    collectionName: 'Silver Earrings',
    types: ['silver', 'classic', 'bridal'],
    price: '$20',
    description: 'Silver earrings closed like a ring with crystals on the top.',
    size: 'small',
  },
  {
    id: 2,
    img: homePhoto2,
    collectionName: 'Gold Bracelet',
    types: ['silver', 'classic', 'bridal'],
    price: '$50',
    description: 'Elegant gold bracelet with a delicate design.',
    size: 'small',
  },
  {
    id: 3,
    img: homePhoto3,
    collectionName: 'Diamond Ring',
    types: ['silver', 'classic', 'bridal'],
    price: '$200',
    description: 'A beautiful diamond ring perfect for special occasions.',
    size: 'small',
  },
  {
    id: 4,
    img: homePhoto4,
    collectionName: 'Silver Earrings',
    types: ['silver', 'classic', 'bridal'],
    price: '$20',
    description: 'Silver earrings closed like a ring with crystals on the top.',
    size: 'small',
  },
  {
    id: 5,
    img: homePhoto5,
    collectionName: 'Gold Bracelet',
    types: ['silver', 'classic', 'bridal'],
    price: '$50',
    description: 'Elegant gold bracelet with a delicate design.',
    size: 'small',
  },
  {
    id: 6,
    img: homePhoto6,
    collectionName: 'Diamond Ring',
    types: ['silver', 'classic', 'bridal'],
    price: '$200',
    description: 'A beautiful diamond ring perfect for special occasions.',
    size: 'small',
  },
  {
    id: 7,
    img: homePhoto7,
    collectionName: 'Silver watch',
    types: ['silver', 'classic', 'bridal'],
    price: '$20',
    description: 'Silver feminin hand watch.',
    size: 'small',
  },
  {
    id: 8,
    img: homePhoto8,
    collectionName: 'Gold Bracelet',
    types: ['silver', 'classic', 'bridal'],
    price: '$50',
    description: 'Elegant gold bracelet with a delicate design.',
    size: 'small',
  },
  {
    id: 9,
    img: homePhoto9,
    collectionName: 'classic watch',
    types: ['silver', 'classic', 'bridal'],
    price: '$200',
    description: 'A beautiful diamond ring perfect for special occasions.',
    size: 'small',
  },
  {
    id: 10,
    img: homePhoto10,
    collectionName: 'Silver Earrings',
    types: ['silver', 'classic', 'bridal'],
    price: '$20',
    description: 'Silver earrings closed like a ring with crystals on the top.',
    size: 'small',
  },
  {
    id: 11,
    img: homePhoto11,
    collectionName: 'Gold Bracelet',
    types: ['silver', 'classic', 'bridal'],
    price: '$50',
    description: 'Elegant gold bracelet with a delicate design.',
    size: 'small',
  },
  {
    id: 12,
    img: homePhoto12,
    collectionName: 'Diamond Ring',
    types: ['silver', 'classic', 'bridal'],
    price: '$200',
    description: 'A beautiful diamond ring perfect for special occasions.',
    size: 'small',
  },
  {
    id: 13,
    img: homePhoto13,
    collectionName: 'Silver Earrings',
    types: ['watches'],
    price: '$20',
    description: 'Silver earrings closed like a ring with crystals on the top.',
    size: 'small',
  },
  {
    id: 14,
    img: homePhoto14,
    collectionName: 'Gold Bracelet',
    types: ['watches'],
    price: '$50',
    description: 'Elegant gold bracelet with a delicate design.',
    size: 'small',
  },
  {
    id: 15,
    img: homePhoto15,
    collectionName: 'Diamond Ring',
    types: ['watches'],
    price: '$200',
    description: 'A beautiful diamond ring perfect for special occasions.',
    size: 'small',
  },
  {
    id: 16,
    img: homePhoto16,
    collectionName: 'Diamond Ring',
    types: ['watches'],
    price: '$200',
    description: 'A beautiful diamond ring perfect for special occasions.',
    size: 'small',
  },
];
