import { useState, useEffect, useCallback } from "react";
import { getProductByHandle } from "../utils/shopify";
import type { ShopifyProductByHandle } from "../types/shopifyTypes";

export default function useProductDetails(handle: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    try {
      const shopifyProduct = await getProductByHandle(handle);
      if (!shopifyProduct) throw new Error("Product not found");
      const mainProduct = transformShopifyToProduct(shopifyProduct);

      // Example: hardcoded or same vendor for related products
      const related: Product[] = []; // Add logic here

      setProduct(mainProduct);
      setRecommendedProducts(related);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setProduct(null);
      setRecommendedProducts([]);
    } finally {
      setLoading(false);
    }
  }, [handle]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return { product, recommendedProducts, loading, error, refetch: fetchProduct };
}
