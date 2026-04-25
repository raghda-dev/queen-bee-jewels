// app/(main)/lib/shopify/graphql/queries.ts



import type {
  ShopifyProduct,
  ShopifyProductsResponse,
  ShopifyProductByHandle,
} from '../types/index';

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

export const GET_PRODUCT_BY_HANDLE_QUERY = `
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
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
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
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

export async function shopifyQuery<T>(query: string, variables = {}): Promise<T> {
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

  return responseBody.data as T;
}

// Fetch all products (first 100)
export async function fetchAllProducts(): Promise<ShopifyProduct[]> {
  const data = await shopifyQuery<ShopifyProductsResponse>(GET_PRODUCTS_QUERY);
  return data.products.edges.map(edge => edge.node);
}

// Fetch product by handle
export async function fetchShopifyProductByHandle(handle: string): Promise<ShopifyProductByHandle | null> {
  const data = await shopifyQuery<{ productByHandle: ShopifyProductByHandle | null }>(
    GET_PRODUCT_BY_HANDLE_QUERY,
    { handle }
  );
  return data.productByHandle;
}


export async function fetchRecommendedProducts(
  productType: string,
  currentProductId: string
): Promise<ShopifyProductByHandle[]> {
  const data = await shopifyQuery<ShopifyProductsResponse>(GET_PRODUCTS_QUERY);

  const allProducts = data.products.edges.map(edge => edge.node);

  const filtered = allProducts.filter(
    product => product.productType === productType && product.id !== currentProductId
  ).slice(0, 4);

  // Fetch full product details for each recommended product by handle
  const recommendedWithVariants = await Promise.all(
    filtered.map(async (product) => {
      const fullProduct = await fetchShopifyProductByHandle(product.handle);
      if (!fullProduct) {
        // Handle missing product gracefully by excluding it
        return null;
      }
      return fullProduct;
    })
  );

  // Filter out nulls
  return recommendedWithVariants.filter(p => p !== null) as ShopifyProductByHandle[];
}