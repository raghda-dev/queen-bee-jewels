import React, { ReactNode } from "react";
import { cn } from "../utils/helpers"; // Utility for merging class names
import styles from '../styles/sass/modules/card.module.scss';
import Image from "next/image";
import { Heart } from "lucide-react";
import Button from "../components/Button";


  
type CardProps = {
 img?: ReactNode;
 collectionName?: ReactNode;
 description?: ReactNode;
 size?: string;

}

const Card: React.FC<CardProps> = ({
  img,
  collectionName,
  description,
  size = 'medium',
}) => {
    return (
        <div className={cn(
          styles.card,
          styles[size],
           
        )}
        >
        {img && <span className=""><Image src={""} alt="category-image" width={150} height={100} />: <>image empty background</></span>}
        <span><Heart size={20}></Heart></span>
        {collectionName && <span className="size-min ml-2">{collectionName}</span>}
        {description && <span className="size-min ml-2">{description}</span>}
        <Button variant="textButton" color="red" rightIcon={<span>→</span>}>see more</Button>
        
        </div>
    )
}




export default Card;