// "use client";

// import { useRouter } from "next/router";
// import { products } from "../../../data/products";
// import Button from "@/components/Button";
// import viewImage1 from '@/public/staticAssets/images/viewImg1.svg';
// import viewImage2 from '@/public/staticAssets/images/viewImg2.svg';
// import viewImage3 from '@/public/staticAssets/images/viewImg3.svg';


// // import viewImage2 from '@/public/staticAssets/images/viewImg2.svg';
// // import viewImage3 from '@/public/staticAssets/images/viewImg3.svg';


// export default function ProductDetails() {
//   const router = useRouter();
//   const { id } = router.query;

//   const product = products.find((prod) => prod.id === Number(id));

//   if (!product) {
//     return <div>Product not found!</div>;
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12 px-6">
//       <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-6xl">
//         {/* Upper Section */}
//         <div className="grid grid-cols-3 gap-4 p-6 border-b border-gray-200">
//           {[product.viewImage1, product.viewImage2, product.viewImage3].map((img, idx) => (
//             <div key={idx} className="h-64 w-full overflow-hidden rounded-xl">
//               <img src={img} alt={`Product ${idx}`} className="object-cover w-full h-full" />
//             </div>
//           ))}
//         </div>

//         {/* Lower Section */}
//         <div className="flex flex-col lg:flex-row gap-8 p-6">
//           <div className="flex-1 space-y-6">
//             {/* Line 1: Name, Type, Price */}
//             <div className="flex flex-wrap items-center gap-6 text-xl font-semibold">
//               <span>Name: {product.collectionName}</span>
//               <span>Types: {product.types}</span>
//               <span>Price: ${product.price}</span>
//             </div>

//             {/* Line 2: Description */}
//             <p className="text-gray-700 text-lg leading-relaxed">
//               Description: {product.description}
//             </p>

//             {/* Line 3: Buttons */}
//             <div className="flex gap-4">
//               <Button size="small" variant="primary" color="var(--purple-light)" animation="bounce">
//                 Add to Cart
//               </Button>
//               <Button size="small" variant="primary" color="var(--purple-light)" animation="bounce">
//                 Add to Wishlist
//               </Button>
//             </div>
//           </div>

//           {/* Properties Box */}
//           <div className="w-full max-w-sm p-4 border rounded-xl bg-gray-50 shadow-inner">
//             <h3 className="text-xl font-bold mb-4">Properties</h3>
//             <ul className="space-y-2 text-gray-700">
//               <li><strong>Material:</strong> {product.material || "Silver"}</li>
//               <li><strong>Collection:</strong> {product.collection || "Bridal"}</li>
//               <li><strong>Color:</strong> {product.color || "Silver"}</li>
//               <li><strong>Size:</strong> {product.size || "Standard"}</li>
//               <li><strong>Occasion:</strong> {product.occasion || "Daily, Events"}</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
