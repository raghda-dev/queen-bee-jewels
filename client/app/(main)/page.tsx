// client/app/(main)/page.tsx

import Head from 'next/head';
import Hero from './components/Hero';
import Categories from './components/Categories';
import '../styles/global.scss';
import '../styles/tailwind.css';
import OnePiece from '../(main)/components/OnePiece';
import Features from '../(main)/components/Features';
import BestSellingScroller from '../(main)/components/BestSellingScroller';
import SignUpIn from '../(main)/components/SignUpIn';

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>Queen Bee Jewels</title>
        <meta
          name="description"
          content="Discover elegant and exquisite jewelry and accessories."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="main__container mx-auto w-full max-w-[1200px] px-4">
        <Hero></Hero>
        <section className="__categories">
          <Categories></Categories>
        </section>
        <section className="__one__piece">
          <OnePiece></OnePiece>
        </section>
        <section className="__features">
          <Features></Features>
        </section>
        <section className="__best__selling">
          <BestSellingScroller></BestSellingScroller>
        </section>
        <section className="__sign_Up_In">
            <SignUpIn />
        </section>
      </main>
    </>
  );
}
