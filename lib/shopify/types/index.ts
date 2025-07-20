// app/(main)/lib/shopify/types/index.ts

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

export interface ShopifySelectedOption {
  name: string;
  value: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  availableForSale: boolean;
  selectedOptions: ShopifySelectedOption[];
}

export interface ShopifyProductByHandle extends ShopifyProduct {
  variants: {
    edges: {
      node: ShopifyVariant;
    }[];
  };
}

export interface ShopifyProductByHandleResponse {
  productByHandle: ShopifyProductByHandle | null;
}
