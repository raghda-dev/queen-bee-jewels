// client/app/(main)/lib/shopify/client.ts

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;
const STOREFRONT_API_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

const SHOPIFY_GRAPHQL_URL = `https://${SHOPIFY_DOMAIN}/api/2023-10/graphql.json`;

export async function shopifyQuery(query: string, variables = {}) {
  const res = await fetch(SHOPIFY_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_API_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const responseBody = await res.json();

  if (responseBody.errors) {
    console.error("Shopify API Error:", responseBody.errors);
    throw new Error("Failed to fetch data from Shopify");
  }

  return responseBody.data;
}
