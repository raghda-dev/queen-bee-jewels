// app/silver/page.tsx
import Card from "@/components/Card";
import { products } from "../../data/products";
import Button from "@/components/Button";
import Link from "next/link";

export default function onSale() {

  const filteredSilverProducts = products.filter((product) => product.types.includes("classic"));
  return (
    <div className="flex justify-evenly py-14">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredSilverProducts.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} legacyBehavior>
            <Card
              {...product}
              primaryButton={
                <Button size="small" variant="primary" color="var(--purple-light)" animation="bounce">
                  Add to Cart
                </Button>
              }
              secondaryButton={
                <Button size="small" variant="primary" color="var(--purple-light)" animation="bounce">
                  Add to Wishlist
                </Button>
              }
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
