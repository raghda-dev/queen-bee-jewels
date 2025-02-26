// app/page.tsx
import Head from "next/head";
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import '../styles/global.scss';
import "../styles/tailwind.css";
import OnePiece from "@/components/OnePiece";


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
        <main className="main__container w-full max-w-[1200px] mx-auto px-4">
        <Hero></Hero>
          <section className="__categories">
           <Categories></Categories>
          </section>
          <section className="__one__piece">
              <OnePiece></OnePiece>
          </section>
          <section className="__features">
            <div className="__features features__card--1">one platform</div>
            <div className="__features features__card--2">secure payment</div>
            <div className="__features features__card--3 ">gift boxes</div>
            <div className="__features features__card--4">special products</div>
          </section>
          <section className="__best__selling">
            <div className="best__selling__img__scroller">
              {/* <img src="" alt="" />
      <img src="" alt="" />
      <img src="" alt="" />
      <img src="" alt="" />
      <img src="" alt="" /> */}
            </div>
          </section>
          <section className="__signin__signup__form"></section>
        </main>
    </>
  );
}
