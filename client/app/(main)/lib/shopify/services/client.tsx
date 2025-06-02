//client/app/(main)/lib/shopify/services/client.tsx


const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN?.replace("https://", "");
const STOREFRONT_API_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

if (!SHOPIFY_DOMAIN || !STOREFRONT_API_TOKEN) {
  throw new Error("Missing Shopify credentials");
}

const SHOPIFY_GRAPHQL_URL = `https://${SHOPIFY_DOMAIN}/api/2023-10/graphql.json`;

export async function shopifyQuery<T>(query: string, variables = {}): Promise<T> {
  const res = await fetch(SHOPIFY_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_API_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
  });

  const responseBody = await res.json();

  if (responseBody.errors) {
    console.error("Shopify API Error:", responseBody.errors);
    throw new Error("Failed to fetch data from Shopify");
  }

  return responseBody.data as T;
}
