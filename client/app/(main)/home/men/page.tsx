<<<<<<< Updated upstream
import { shopifyQuery } from "../../utils/shopify";
import { GET_PRODUCTS_QUERY } from "../../utils/shopify";
=======
// client/app/(main)/home/men/page.tsx

import { shopifyQuery } from "../../lib/shopify/client";
import { GET_PRODUCTS_QUERY } from "../../lib/shopify/products/queries";
import { ShopifyProductsResponse, ShopifyProduct } from "../../lib/shopify/products/types";
>>>>>>> Stashed changes

import Card from "../../components/Card";
import Button from "../../components/Button";
import Link from "next/link";

<<<<<<< Updated upstream
import { ShopifyProductsResponse, ShopifyProduct } from "../../types/shopifyTypes";

export default async function MenOnly() {
  const data: ShopifyProductsResponse = await shopifyQuery(GET_PRODUCTS_QUERY);
  const products: ShopifyProduct[] = data.products.edges.map(
    (edge) => edge.node
  );

  const filteredMenProducts = products.filter((product) =>
    product.tags?.some((tag) => tag.toLowerCase() === "men")
=======
export default async function MenOnlyPage() {
  const data: ShopifyProductsResponse = await shopifyQuery(GET_PRODUCTS_QUERY);
  const allProducts: ShopifyProduct[] = data.products.edges.map((edge) => edge.node);

  // Filter for men's products based on tags
  const menProducts = allProducts.filter((product) =>
    product.tags.some((tag) => tag.toLowerCase().includes("men"))
>>>>>>> Stashed changes
  );

  return (
    <div className="flex justify-evenly py-14">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
<<<<<<< Updated upstream
        {filteredMenProducts.map((product) => (
          <Link
            key={product.id}
            href={`/home/product/${product.handle}`}
            legacyBehavior
          >
=======
        {menProducts.map((product) => (
          <Link key={product.id} href={`/home/product/${product.handle}`} legacyBehavior>
>>>>>>> Stashed changes
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
          </Link>
        ))}
      </div>
    </div>
  );
}
