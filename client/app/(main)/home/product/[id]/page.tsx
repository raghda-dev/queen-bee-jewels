
import { products } from '../../data/products'; // Import the Product type
import ProductDetailsClient from '../[id]/ProductDetailsClient'; // Import the Client Component

async function fetchProductData(productId: string) {
  // Simulate fetching product data
  const product = products.find((prod) => prod.id === Number(productId));

  if (!product) {
    return null;
  }

  // Find related products (exclude the current product)
  const recommendedProducts = products.filter(
    (prod) => prod.id !== product.id && prod.types.some((type) => product.types.includes(type))
  );

  return { product, recommendedProducts };
}

export default async function ProductDetails({ params }: { params: { id: string } }) {
  const { id } = params;

  // Fetch product and related products
  const data = await fetchProductData(id);

  if (!data || !data.product) {
    return <div>Product not found</div>;
  }

  const { product, recommendedProducts } = data;

  // Prepare the product images
  const viewImages = [
    product.viewImage1,
    product.viewImage2,
    product.viewImage3,
  ];

  // Pass data to the Client Component
  return (
    <ProductDetailsClient
      product={product}
      recommendedProducts={recommendedProducts}
      viewImages={viewImages}
    />
  );
}
