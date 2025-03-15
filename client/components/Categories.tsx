import React from "react";
import Card from '../components/Card';
import '../styles/global.scss';
import img1 from '../public/staticAssets/images/category_img-1.svg'
import img2 from '../public/staticAssets/images/category_img-2.svg'
import img3 from '../public/staticAssets/images/category_img-3.svg'
import img4 from '../public/staticAssets/images/category_img-4.svg'


const Categories = () => {
    return (
        <div className="categories bg-mutedRed flex flex-col w-full justify-center gap-6 p-6 cursor-pointer">

            <h1 className="text-center capitalize mb-9 text-5xl sm:ml-16 md:ml-16 sm:text-left sm:text-6xl font-extrabold font-josefin mt-20 lg:mt-60
                 inline-block bg-gradient-to-r from-white via-mainOrange to-grayDark lg:text-6xl
                 bg-clip-text text-transparent slide-in-left delay-0.2s">
            check our main categories
            </h1>
            <div className="category_cards grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 lg:mt-[-15rem]
               xl:gap-[10rem] lg:gap-6 md:gap-y-6 md:gap-x-4 sm:gap-y-7
               w-full max-w-[130rem] mx-auto px-6 pr-0 min-h-screen xs:gap-y-3 place-items-center">
            <div className="card-item">
            <Card img={img1} collectionName="Our Watches collection" description="special watch for a complete look."></Card>
            </div>
            <div className="card-item">
            <Card img={img2} collectionName="Our Bridal collection" description="everything a bride might need."></Card>
            </div>
            <div className="card-item">
            <Card img={img3} collectionName="Our Silver collection" description="silver only for silver lovers."></Card>
            </div>
            <div className="card-item">
            <Card img={img4} collectionName="Our Classic collection" description="find more in our classic collection."></Card>
            </div>
            </div>    
        </div>
    )
}



export default Categories;