// client/app/(main)/home/bridal/page.tsx

import { shopifyQuery } from "../../lib/shopify/client";
import { GET_PRODUCTS_QUERY } from "../../lib/shopify/products/queries";
import { ShopifyProductsResponse, ShopifyProduct } from "../../lib/shopify/products/types";

import { shopifyQuery } from "../../utils/shopify";
import { GET_PRODUCTS_QUERY } from "../../utils/shopify";

import Card from "../../components/Card";
import Button from "../../components/Button";
import Link from "next/link";

<<<<<<< Updated upstream
import { ShopifyProduct } from "../../types/shopifyTypes"; // adjust if needed

export default async function Bridal() {
  const data = await shopifyQuery(GET_PRODUCTS_QUERY);
  const products: ShopifyProduct[] = data.products.edges.map(
    (edge: { node: ShopifyProduct }) => edge.node
  );

  // Filter by productType or tags
  const filteredBridals = products.filter(
    (product) =>
      product.productType?.toLowerCase() === "bridal" ||
      product.tags?.map((t) => t.toLowerCase()).includes("bridal")
  );
=======
export default async function bridalOnlyPage() {
  const data: ShopifyProductsResponse = await shopifyQuery(GET_PRODUCTS_QUERY);
  const allProducts: ShopifyProduct[] = data.products.edges.map((edge) => edge.node);

  // ✅ Safely handle null/undefined types or tags
  const bridalProducts = allProducts.filter((product) => {
    const productType = product.productType?.toLowerCase() || "";
    const tags = product.tags || [];
    return productType.includes("bridal") || tags.some((tag) => tag.toLowerCase().includes("silver"));
  });
>>>>>>> Stashed changes

  return (
    <div className="flex justify-evenly py-14">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
<<<<<<< Updated upstream
        {filteredBridals.map((product) => (
          <Link
            key={product.id}
            href={`/home/product/${product.handle}`}
            legacyBehavior
          >
=======
        {bridalProducts.map((product) => (
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
