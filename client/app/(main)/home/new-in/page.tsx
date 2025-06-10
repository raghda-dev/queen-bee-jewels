// client/app/(main)/home/men/page.tsx

import Link from "next/link";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { shopifyQuery } from "../../lib/shopify/client";
import { GET_PRODUCTS_QUERY } from "../../lib/shopify/products/queries";
import { ShopifyProductsResponse, ShopifyProduct } from "../../lib/shopify/products/types";

export default async function NewInPage() {
  const data: ShopifyProductsResponse = await shopifyQuery(GET_PRODUCTS_QUERY);
  const allProducts: ShopifyProduct[] = data.products.edges.map((edge) => edge.node);

  // Filter for men's products based on tags
  const menProducts = allProducts.filter((product) => {
    const tags = product.tags?.map((tag) => tag.toLowerCase()) || [];
    return tags.some((tag) => tag.includes("new-in") || tags.includes("silver"));
  });

  return (
    <div className="flex justify-evenly py-14">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {menProducts.map((product) => (
          <Link key={product.id} href={`/home/product/${product.handle}`} legacyBehavior>
            <a>
              <Card
                size="medium"
                id={product.id}
                handle={product.handle}
                title={product.title}
                description={product.description ?? undefined}
                img={product.featuredImage?.url ?? undefined}
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
