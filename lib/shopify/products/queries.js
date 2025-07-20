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

export const GET_PRODUCTS_BY_ID = `
  query GET_PRODUCTS_BY_ID($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        id
        title
        description
        productType
        featuredImage {
          url
        }
        priceRange {
          minVariantPrice {
            amount
          }
        }
      }
    }
  }
`;
