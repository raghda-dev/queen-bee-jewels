// client/app/home/data/products.ts
import { StaticImageData } from 'next/image';
import homePhoto1 from '../../../../public/staticAssets/images/homePhoto1.svg';
import homePhoto2 from '../../../../public/staticAssets/images/homePhoto2.svg';

export type ShopifyProduct = {
  id: string;
  title: string;
  handle: string;
  description: string;
  featuredImage: {
    url: StaticImageData;
    altText?: string;
  };
  images: { url: StaticImageData; altText?: string }[];
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    selectedOptions: { name: string; value: string }[];
  }[];
  productType: string;
  vendor: string;
  tags: string[];
};

export const products: ShopifyProduct[] = [
  {
    id: '1',
    title: 'Silver Earrings',
    handle: 'silver-earrings',
    description: 'Silver earrings closed like a ring with crystals on the top.',
    featuredImage: {
      url: homePhoto1,
      altText: 'Silver Earrings',
    },
    images: [
      { url: homePhoto1 },
      { url: homePhoto2 },
      { url: homePhoto1 },
    ],
    priceRange: {
      minVariantPrice: {
        amount: '20.00',
        currencyCode: 'USD',
      },
      maxVariantPrice: {
        amount: '25.00',
        currencyCode: 'USD',
      },
    },
    variants: [
      {
        id: 'v1',
        title: 'Small',
        price: {
          amount: '20.00',
          currencyCode: 'USD',
        },
        selectedOptions: [
          { name: 'Size', value: 'Small' },
        ],
      },
    ],
    productType: 'Earrings',
    vendor: 'QueenBee',
    tags: ['silver', 'bridal', 'classic'],
  },
  {
    id: '2',
    title: 'Gold Bracelet',
    handle: 'gold-bracelet',
    description: 'Elegant gold bracelet with a delicate design.',
    featuredImage: {
      url: homePhoto2,
      altText: 'Gold Bracelet',
    },
    images: [
      { url: homePhoto2 },
      { url: homePhoto1 },
      { url: homePhoto2 },
    ],
    priceRange: {
      minVariantPrice: {
        amount: '50.00',
        currencyCode: 'USD',
      },
      maxVariantPrice: {
        amount: '60.00',
        currencyCode: 'USD',
      },
    },
    variants: [
      {
        id: 'v2',
        title: 'Medium',
        price: {
          amount: '50.00',
          currencyCode: 'USD',
        },
        selectedOptions: [
          { name: 'Size', value: 'Medium' },
        ],
      },
    ],
    productType: 'Bracelets',
    vendor: 'QueenBee',
    tags: ['gold', 'classic'],
  },
];
