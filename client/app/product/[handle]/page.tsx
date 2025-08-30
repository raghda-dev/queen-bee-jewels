// client/app/product/[handle]/page.tsx


import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { ShopifyProduct } from '../../../../lib/shopify/products/types';
import { fetchShopifyProductByHandle } from '../../../../lib/shopify';

function getImageUrlsFromProduct(product: ShopifyProduct | undefined): string[] {
  const urls: string[] = [];
  if (product?.images?.edges && Array.isArray(product.images.edges)) {
    for (const edge of product.images.edges) {
      const url = edge?.node?.url;
      if (typeof url === 'string' && url.trim() !== '') urls.push(url);
    }
  }
  const featured = product?.featuredImage?.url;
  if (urls.length === 0 && typeof featured === 'string' && featured.trim() !== '') urls.push(featured);
  return urls;
}

export default async function PublicProductPage({ params }: { params: { handle: string } }) {
  const handle = params?.handle;
  if (!handle) return notFound();

  const product = await fetchShopifyProductByHandle(handle);
  if (!product) return notFound();

  const images = getImageUrlsFromProduct(product);

  return (
    <div className="h-auto w-[90%] flex items-start justify-center bg-gray-50 m-10">
      <main className="w-full max-w-6xl h-auto bg-white rounded-xl shadow-sm overflow-hidden">
        <header className="px-6 py-5 border-b">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-sm text-gray-500 mt-1">handle: {product.handle}</p>
        </header>

        <section className="flex items-center justify-center p-10">
          {/* Responsive gallery */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-2">
            {/* Top image spanning both columns */}
            <div className="md:col-span-2">
              {images[0] ? (
                <div className="w-full h-[40vh] md:h-[60vh] overflow-hidden rounded-xl">
                  <Image
                    src={images[0]}
                    width={1600}
                    height={1200}
                    alt={product.title ?? 'product image'}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-[60vh] bg-gray-200 rounded-xl" />
              )}
            </div>

            {/* Bottom two images */}
            {images.length > 1 ? (
              images.slice(1, 3).map((src, i) => (
                <div key={i} className="w-full h-[30vh] md:h-[40vh] overflow-hidden rounded-xl">
                  <Image
                    src={src}
                    width={800}
                    height={600}
                    alt={`${product.title} ${i + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
            ) : (
              <>
                <div className="w-full h-[30vh] bg-gray-100 rounded-xl" />
                <div className="w-full h-[30vh] bg-gray-100 rounded-xl" />
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
