//client/app/(main)/components/ProductList.tsx

'use client';

import { useEffect, useState } from 'react';
import { shopifyQuery, GET_PRODUCTS_QUERY } from '../utils/shopify';
import Image from 'next/image';

type Product = {
  id: string;
  title: string;
  handle: string;
  featuredImage?: { url: string; altText: string };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
};

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  async function fetchProducts() {
    try {
      const res = await shopifyQuery(GET_PRODUCTS_QUERY);
      console.log("Shopify response:", res); // ✅ Browser log
      const nodes = res.products.edges.map((edge: any) => edge.node);
      setProducts(nodes);
    } catch (err) {
      console.error("Error fetching products:", err); // ✅ Error log
    } finally {
      setLoading(false); // ✅ Always stop loading
    }
  }

  fetchProducts();
}, []);



  if (loading) return <p>Loading products...</p>;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {products.map((product) => (
        <div key={product.id} className="rounded border p-4">
          <Image
            src={product.featuredImage?.url || '/placeholder.png'}
            alt={product.featuredImage?.altText || product.title}
            width={400}
            height={300}
            className="h-48 w-full object-cover"
          />
          <h2 className="mt-2 text-lg font-semibold">{product.title}</h2>
          <p className="text-sm text-gray-500">
            {product.priceRange.minVariantPrice.amount}{' '}
            {product.priceRange.minVariantPrice.currencyCode}
          </p>
        </div>
      ))}
    </div>
  );
}
