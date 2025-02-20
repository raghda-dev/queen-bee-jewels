import React from "react";
import Card from '../components/Card';


const Categories = () => {
    return (
        <div>
            <div className="category_heading bg-mutedRed flex flex-col justify-between">
            <h2>
            check our main categories
            </h2>
            </div>
            <div className="category_cards">
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            </div>    
        </div>
    )
}



export default Categories;