<<<<<<< Updated upstream
// app/(main)/home/watches/page.tsx

import { shopifyQuery } from "../../utils/shopify";
import { GET_PRODUCTS_QUERY } from "../../utils/shopify";
=======
// client/app/(main)/home/watches/page.tsx

import { shopifyQuery } from "../../lib/shopify/client";
import { GET_PRODUCTS_QUERY } from "../../lib/shopify/products/queries";
import { ShopifyProductsResponse, ShopifyProduct } from "../../lib/shopify/products/types";
>>>>>>> Stashed changes

import Card from "../../components/Card";
import Button from "../../components/Button";
import Link from "next/link";

<<<<<<< Updated upstream
import { ShopifyProduct } from "../../types/shopifyTypes"; // adjust path if needed

export default async function Watches() {

  const data = await shopifyQuery(GET_PRODUCTS_QUERY);

 const products: ShopifyProduct[] = data.products.edges.map(
  (edge: { node: ShopifyProduct }) => edge.node
);


  const filteredWatches = products.filter((product) =>
    product.tags?.some((tag) => tag.toLowerCase() === "watch")
  );
=======
export default async function watchesOnlyPage() {
  const data: ShopifyProductsResponse = await shopifyQuery(GET_PRODUCTS_QUERY);
  const allProducts: ShopifyProduct[] = data.products.edges.map((edge) => edge.node);

  // ✅ Safely handle null/undefined types or tags
  const watchesProducts = allProducts.filter((product) => {
    const productType = product.productType?.toLowerCase() || "";
    // const tags = product.tags || [];
    return productType.includes("watches");
  });
>>>>>>> Stashed changes

  return (
    <div className="flex justify-evenly py-14">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
<<<<<<< Updated upstream
        {filteredWatches.map((product) => (
=======
        {watchesProducts.map((product) => (
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
              images={
                product.images?.edges?.map((img) => img.node.url) ?? []
              }
=======
              images={product.images?.edges?.map((img) => img.node.url) || []}
>>>>>>> Stashed changes
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
