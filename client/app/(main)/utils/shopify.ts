export const GET_PRODUCTS_QUERY = `
  {
    products(first: 100) {
      edges {
        node {
          id
          title
          handle
          description
          productType
          vendor
          tags
          featuredImage {
            url
            altText
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;


const SHOPIFY_DOMAIN = "queenbeejewels097.myshopify.com";
const STOREFRONT_API_TOKEN = "a7ec78b2b48de7747bc20d5170bbcc04";

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
