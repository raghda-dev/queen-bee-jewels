// client/app/(main)/components/Categories.tsx

'use client';

import React, { useEffect, useState } from 'react';
import Card from './Card';
import Button from './Button';
import { fetchCollections, Collection } from 'data/collections';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '../lib/redux/hooks';

const Categories = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useAppSelector((state) => state.user.user);
  const router = useRouter();

  useEffect(() => {
    const loadCollections = async () => {
      try {
        const data = await fetchCollections();
        setCollections(data);
      } catch (error) {
        console.error('Error loading collections:', error);
      } finally {
        setLoading(false);
      }
    };
    loadCollections();
  }, []);

  // ✅ Trick: prevent broken layout if still loading or user state isn't resolved
  if (loading || user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading categories...
      </div>
    );
  }

  return (
    <div className="categories flex w-full flex-col justify-center gap-6 bg-mutedRed p-3">
      <div className="w-full max-w-[1400px] mx-auto">
        <h1 className="z-50 via-mainOrange inline-block bg-gradient-to-r from-white to-grayDark bg-clip-text text-center font-josefin text-4xl xs:text-5xl font-bold text-transparent sm:ml-16 sm:text-left mt-7 lg:mt-28 lg:text-6xl lg:font-black mb-7">
          Check our main categories
        </h1>
        <div className="space-y-6 category_cards mx-auto lg:mt-[-8rem] grid min-h-screen w-full max-w-[130rem] place-items-center px-3 pr-0 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          {collections.map((collection) => (
            <div className="card-item" key={collection.id}>
              <Card
                img={collection.image?.src}
                collectionName={collection.title}
                title={collection.title}
                description={collection.description}
                size="medium"
                showHeart
                primaryButton={
                  <Button
                    size="medium"
                    variant="textButton"
                    color="var(--deep-brown)"
                    animation="text-underline"
                    underlineDirection="from-left"
                    rightIcon={<span>→</span>}
                    onClick={() => {
                      if (user) {
                        router.push('/home');
                        window.location.href = '/home';
                      } else {
                        router.push(`/collections/${collection.slug}`);
                      }
                    }}
                  >
                    See More
                  </Button>
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
