// app/product/[id]/page.tsx
import { useParams } from 'next/navigation';

export default function ProductPage() {
  const { id } = useParams(); // Access dynamic route parameter

  return (
    <div>
      <h1>Product Details for {id}</h1>
      {/* Fetch product details based on `id` */}
    </div>
  );
}
