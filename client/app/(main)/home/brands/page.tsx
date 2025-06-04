<<<<<<< Updated upstream
// app/(main)/home/brands/page.tsx

import { shopifyQuery } from "../../utils/shopify";
import { GET_PRODUCTS_QUERY } from "../../utils/shopify";
=======
// client/app/(main)/home/brands/page.tsx

import { shopifyQuery } from "../../lib/shopify/client";
import { GET_PRODUCTS_QUERY } from "../../lib/shopify/products/queries";
import { ShopifyProductsResponse, ShopifyProduct } from "../../lib/shopify/products/types";
>>>>>>> Stashed changes

import Card from "../../components/Card";
import Button from "../../components/Button";
import Link from "next/link";

<<<<<<< Updated upstream
import {
  ShopifyProductsResponse,
  ShopifyProduct,
} from "../../types/shopifyTypes";

export default async function SilverPage() {
  const data: ShopifyProductsResponse = await shopifyQuery(GET_PRODUCTS_QUERY);
  const products: ShopifyProduct[] = data.products.edges.map(
    (edge) => edge.node
  );

  // Adjust the tag or condition based on how "classic silver" is categorized
  const filteredSilverProducts = products.filter((product) =>
    product.tags?.some((tag) => tag.toLowerCase().includes("brand"))
  );
=======
export default async function brandsOnlyPage() {
  const data: ShopifyProductsResponse = await shopifyQuery(GET_PRODUCTS_QUERY);
  const allProducts: ShopifyProduct[] = data.products.edges.map((edge) => edge.node);

  // ✅ Safely handle null/undefined types or tags
  const brandsProducts = allProducts.filter((product) => {
    const productType = product.productType?.toLowerCase() || "";
    const tags = product.tags || [];
    return productType.includes("brands") || tags.some((tag) => tag.toLowerCase().includes("silver"));
  });
>>>>>>> Stashed changes

  return (
    <main className="max-w-7xl mx-auto px-4 py-14">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
<<<<<<< Updated upstream
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
=======
        {brandsProducts.map((product) => (
          <Link key={product.id} href={`/home/product/${product.handle}`} legacyBehavior>
            <Card
              size="medium"
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
>>>>>>> Stashed changes
          </Link>
        ))}
      </div>
    </main>
  );
}
