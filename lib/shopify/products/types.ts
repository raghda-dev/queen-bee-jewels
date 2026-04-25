// client/app/(main)/lib/shopify/products/types.ts

export interface ShopifyImage {
  url: string;
  altText?: string | null;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description?: string | null;
  productType?: string | null;
  vendor?: string | null;
  tags: string[];
  featuredImage?: ShopifyImage | null;
  images?: {
    edges: {
      node: ShopifyImage;
    }[];
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
}

export interface ShopifyProductsResponse {
  products: {
    edges: {
      node: ShopifyProduct;
    }[];
  };
}