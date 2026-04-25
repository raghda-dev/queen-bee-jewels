// client/app/(main)/components/OnePiece.tsx

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Button from './Button';
import { useRouter } from 'next/navigation';

export default function OnePiece() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const goFindOut = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/random-product');
      if (!res.ok) {
        // silent fallback: go home
        console.warn('random-product API non-ok', res.status, await res.text().catch(() => ''));
        router.push('/');
        return;
      }
      const json = await res.json();
      if (json?.handle) {
        router.push(`/product/${encodeURIComponent(json.handle)}`);
      } else {
        router.push('/');
      }
    } catch (err) {
      console.error('Go find out error:', err);
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="__one__piece flex flex-col-reverse md:flex-row p-9 bg-grayDark h-[75vh] sm:h-[70vh] md:h-[55vh] lg:h-[60vh]">
      <div className="one__piece one__piece__text flex h-[21vh] md:h-[30vh] md:w-[75vw] md:text-center md:mt-24 flex-col items-center justify-between text-white ml-7">
        <h2 className="z-50 one_special_piece via-deepOrange bg-gradient-to-r from-deepPurpleRed to-grayMedium bg-clip-text font-josefin text-4xl xs:text-5xl font-bold text-transparent transition-all">
          One special piece
        </h2>
        <p className="find_piece text-xl xs:text-2xl sm:text-3xl text-center lg:text-3xl font-normal">
          you will definitely find a special piece that looks like you.
        </p>
        <Button
          size="large"
          variant="textButton"
          color="var(--pinkish)"
          hoverTextColor="green"
          animation="text-underline"
          rightIcon={<span>→</span>}
          onClick={goFindOut}
          disabled={loading}
        >
          {loading ? 'Finding...' : 'go find out'}
        </Button>
      </div>

      <div className="one__piece one__piece__img">
        <Image src="/staticAssets/images/lines.svg" height={250} width={300} alt="a crooked line" className="h-[50vh] w-[40vw] hidden md:block" />
      </div>

      <div className="one__piece one__piece__img">
        <Image src="/staticAssets/images/smallBoxes.svg" height={70} width={70} alt="two small boxes" className="m-2 hidden md:block md:mt-40 md:mr-32" />
      </div>

      <div className="one__piece one__piece__img ml-5 mr-5 md:mt-10">
        <Image src="/staticAssets/images/watch-image.svg" height={250} width={300} alt="a watch image" className="rounded-lg border border-grayLight h-[31vh] sm:h-[40vh] w-[80vw] md:w-[55vw] md:h-[45]" />
      </div>
    </div>
  );
}
