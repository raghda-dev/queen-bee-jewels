// queenbeejewels/lib/shopify/collections/types.ts

export interface ShopifyCollectionResponse {
  collection: {
    id: string;
    handle: string;
    title: string;
    description: string;
    image: {
      url: string;
    } | null;
    products: {
      edges: {
        node: {
          id: string;
          handle: string;
          title: string;
          description: string;
          featuredImage: {
            url: string;
          } | null;
          images: {
            edges: { node: { url: string } }[];
          };
          priceRange: {
            minVariantPrice: {
              amount: string;
              currencyCode: string;
            };
          };
          productType: string;
          vendor: string;
          tags: string[];
        };
      }[];
    };
  } | null;
}
