// client/data/collections.ts

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: { src: string };
  price: number;
  currencyCode: string;
};

export type Collection = {
  id: string;
  slug: string;
  handle: string;
  title: string;
  description: string;
  image: { src: string };
  products: Product[]; // ✅ ADD PRODUCTS HERE
};

// ✅ DUMMY COLLECTIONS WITH PRODUCTS
export const collectionsData: Collection[] = [
  {
    id: '1',
    slug: 'watches',
    handle: 'watches',
    title: 'Watches Collection',
    description: 'Special watches for a complete look.',
    image: { src: '/staticAssets/images/category_img-1.svg' },
    products: [
      {
        id: 'w1',
        handle: 'golden-watch',
        title: 'Golden Watch',
        description: 'Elegant golden watch with leather strap.',
        image: { src: '/staticAssets/images/products/golden_watch.jpg' },
        price: 250,
        currencyCode: 'USD',
      },
      {
        id: 'w2',
        handle: 'black-leather-watch',
        title: 'Black Leather Watch',
        description: 'Minimalistic design with premium leather.',
        image: { src: '/staticAssets/images/products/black_watch.jpg' },
        price: 190,
        currencyCode: 'USD',
      },
    ],
  },
  {
    id: '2',
    slug: 'bridal',
    handle: 'bridal',
    title: 'Bridal Collection',
    description: 'Everything a bride might need.',
    image: { src: '/staticAssets/images/category_img-2.svg' },
    products: [
      {
        id: 'b1',
        handle: 'pearl-necklace',
        title: 'Pearl Necklace',
        description: 'Pure elegance in white pearls.',
        image: { src: '/staticAssets/images/products/pearl_necklace.jpg' },
        price: 320,
        currencyCode: 'USD',
      },
    ],
  },
  {
    id: '3',
    slug: 'silver',
    handle: 'silver',
    title: 'Silver Collection',
    description: 'Silver only for silver lovers.',
    image: { src: '/staticAssets/images/category_img-3.svg' },
    products: [
      {
        id: 's1',
        handle: 'silver-bracelet',
        title: 'Silver Bracelet',
        description: 'Delicate handmade silver bracelet.',
        image: { src: '/staticAssets/images/products/silver_bracelet.jpg' },
        price: 110,
        currencyCode: 'USD',
      },
    ],
  },
  {
    id: '4',
    slug: 'classic',
    handle: 'classic',
    title: 'Classic Collection',
    description: 'Find more in our classic collection.',
    image: { src: '/staticAssets/images/category_img-4.svg' },
    products: [
      {
        id: 'c1',
        handle: 'vintage-ring',
        title: 'Vintage Ring',
        description: 'Timeless vintage ring in gold finish.',
        image: { src: '/staticAssets/images/products/vintage_ring.jpg' },
        price: 180,
        currencyCode: 'USD',
      },
    ],
  },
];

// ✅ FETCH ALL COLLECTIONS (Used in Categories)
export const fetchCollections = async (): Promise<Collection[]> => {
  return Promise.resolve(collectionsData);
};

// ✅ FETCH COLLECTION BY SLUG (Used in /collections/[slug]/page.tsx)
export const fetchCollectionBySlug = async (
  slug: string
): Promise<Collection | undefined> => {
  return Promise.resolve(collectionsData.find((c) => c.slug === slug));
};

// ✅ FETCH PRODUCT BY HANDLE (Optional - for /product/[handle])
export const fetchProductByHandle = async (
  handle: string
): Promise<Product | undefined> => {
  for (const collection of collectionsData) {
    const product = collection.products.find((p) => p.handle === handle);
    if (product) return product;
  }
  return undefined;
};
