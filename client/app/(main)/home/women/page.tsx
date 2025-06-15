// client/app/(main)/home/women/page.tsx

import Link from "next/link";
import { fetchAllProducts, ShopifyProduct } from "../../lib/shopify";
import Card from "../../components/Card";
import Button from "../../components/Button";

export default async function WomenOnly() {
  const products: ShopifyProduct[] = await fetchAllProducts();

  // Filter for women's products based on tags
  const womenProducts = products.filter((product) => {
    const tags = product.tags?.map((tag) => tag.toLowerCase()) || [];
    return tags.some((tag) => tag.includes("women"));
  });

  return (
    <div className="flex justify-evenly py-14">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {womenProducts.map((product) => (
          <Link
            key={product.id}
            href={`/home/product/${product.handle}`}
            legacyBehavior
          >
            <a>
              <Card
                size="small"
                id={product.id}
                title={product.title}
                handle={product.handle}
                description={product.description ?? undefined}
                img={product.featuredImage?.url ?? undefined} // consistent with other pages
                price={product.priceRange.minVariantPrice.amount}
                currencyCode={product.priceRange.minVariantPrice.currencyCode}
                images={product.images?.edges?.map((img) => img.node.url) || []}
                productType={product.productType ?? undefined}
                vendor={product.vendor ?? undefined}
                tags={product.tags}
                primaryButton={
                  <Button
                    size="small"
                    variant="primary"
                    color="var(--purple-light)"
                    animation="bounce"
                  >
                    Add to Cart
                  </Button>
                }
                secondaryButton={
                  <Button
                    size="small"
                    variant="primary"
                    color="var(--purple-light)"
                    animation="bounce"
                  >
                    Add to Wishlist
                  </Button>
                }
              />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
