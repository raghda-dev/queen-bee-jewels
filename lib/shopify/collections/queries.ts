// queenbeejewels/lib/shopify/collections/queries.ts

export const GET_COLLECTION_BY_HANDLE_QUERY = `
query GetCollectionByHandle($handle: String!) {
  collection(handle: $handle) {
    title
    description
    image {
      url
    }
    products(first: 20) {
      edges {
        node {
          id
          handle
          title
          description
          featuredImage {
            url
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 10) {
            edges {
              node {
                url
              }
            }
          }
          productType
          vendor
          tags
        }
      }
    }
  }
}
`;
