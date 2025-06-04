// client/app/(main)/lib/shopify/products/queries.ts

export const GET_PRODUCTS_QUERY = `
  query GetProducts {
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
