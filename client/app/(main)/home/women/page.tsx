<<<<<<< Updated upstream
import { shopifyQuery } from "../../utils/shopify";
import { GET_PRODUCTS_QUERY } from "../../utils/shopify";
=======
// client/app/(main)/home/women/page.tsx

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

export default async function WomenOnly() {
  const data: ShopifyProductsResponse = await shopifyQuery(GET_PRODUCTS_QUERY);
  const products: ShopifyProduct[] = data.products.edges.map(
    (edge) => edge.node
  );

  const filteredWomenProducts = products.filter((product) =>
    product.tags?.some((tag) => tag.toLowerCase() === "women")
  );

  return (
    <div className="flex justify-evenly py-14">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredWomenProducts.map((product) => (
=======

export default async function WomenOnly() {
  const data: ShopifyProductsResponse = await shopifyQuery(GET_PRODUCTS_QUERY);
  const products: ShopifyProduct[] = data.products.edges.map(
    (edge) => edge.node
  );

  products.forEach((product) => {
  console.log("Product Title:", product.title);
  console.log("Tags:", product.tags);
  console.log("Product Type:", product.productType);
});


const filteredProducts = products.filter((product) => {
  const tags = product.tags?.map((t) => t.toLowerCase()) || [];
  const productType = product.productType?.toLowerCase() || "";

  return tags.includes("women") || productType.includes("classic");
});


  return (
    <div className="flex justify-evenly py-14">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
>>>>>>> Stashed changes
          <Link
            key={product.id}
            href={`/home/product/${product.handle}`}
            legacyBehavior
          >
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
