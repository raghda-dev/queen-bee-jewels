// app/(main)/home/brands/page.tsx


import { fetchAllProducts, ShopifyProduct } from "../../lib/shopify"; // Barrel import
import Card from "../../components/Card";
import Button from "../../components/Button";
import Link from "next/link";


export default async function SilverPage() {
  
  const products: ShopifyProduct[] = await fetchAllProducts();

  // Adjust the tag or condition based on how "classic silver" is categorized
  const filteredSilverProducts = products.filter((product) =>
    product.tags?.some((tag) => tag.toLowerCase().includes("brand"))
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-14">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredSilverProducts.map((product) => (
          <Link
            key={product.id}
            href={`/home/product/${product.handle}`}
            passHref
            legacyBehavior
          >
            <a className="block">
              <Card
                size="small"
                id={product.id}
                title={product.title}
                handle={product.handle}
                description={product.description ?? undefined}
                image={product.featuredImage?.url ?? undefined}
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
    </main>
  );
}
